
// @google/genai guidelines followed for initialization and search tool results
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult, RiskLevel } from "../types.ts";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private static readonly SYSTEM_PROMPT = `You are an elite Cybersecurity Analyst for the Phishing Detection Neural Engine. 
  Analyze inputs for:
  - Typosquatting/Homograph attacks (e.g. g00gle.com vs google.com)
  - Urgency/Fear tactics in text
  - Suspicious redirects or hidden forms
  - Brand impersonation (visual or textual)
  - Requests for credentials, MFA codes, or sensitive tokens.
  Be extremely critical. If any element looks suspicious or is a known phishing pattern, mark as HIGH or CRITICAL risk.`;

  private static readonly MOCK_INTEL = {
    reports: [
      { node: "US_FINANCE", type: "Precision Spear-Phishing", action: "ACTIVE_CONTAINMENT", description: "Targeted campaign against regional banking infrastructure using compromised PDF invoices." },
      { node: "EU_GOV_NODE", type: "Credential Harvesting", action: "MONITORING", description: "Increase in OAuth permission requests from non-verified third-party security apps." },
      { node: "APAC_RETAIL", type: "QR Code Phishing (Quishing)", action: "ACTIVE", description: "Malicious QR codes found in physical transit hubs redirecting to fake payment gateways." },
      { node: "GLOBAL_CLOUD", type: "Supply Chain Attack", action: "INVESTIGATING", description: "Anomalous API key rotations detected across multiple high-traffic dev nodes." },
      { node: "LATAM_TELCO", type: "SMS Smishing", action: "MITIGATED", description: "Bulk SMS campaign impersonating logistics providers contained by carrier filters." }
    ],
    summary: "Global threat nodes exhibiting elevated lateral movement patterns in finance and retail sectors.",
    groundingSources: []
  };

  async chatWithAssistant(history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: "You are the Phishing Detection Neural Assistant. Help users understand phishing, how to protect themselves, and technical cybersecurity concepts. Keep responses professional, tactical, and concise.",
        }
      });
      return response.text || "Neural connection timeout.";
    } catch (e) {
      return "The Neural Assistant is currently under heavy load (Quota Limited). Please re-authenticate the link later.";
    }
  }

  async getLiveThreatIntel(): Promise<{ reports: any[], summary: string, groundingSources?: any[] }> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Identify the top 5 most recent and significant phishing or cyber threat reports from the last 72 hours. Provide a list including location/target, type of threat, and status. Also provide a one-sentence global summary of current trends.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reports: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    node: { type: Type.STRING, description: "Location or industry node (e.g. US_FINANCE)" },
                    type: { type: Type.STRING, description: "Threat type (e.g. QR Phishing, Brand Impersonation)" },
                    action: { type: Type.STRING, description: "Status (e.g. ACTIVE, CONTAINED, UNDER_ANALYSIS)" },
                    description: { type: Type.STRING }
                  },
                  required: ["node", "type", "action"]
                }
              },
              summary: { type: Type.STRING }
            },
            required: ["reports", "summary"]
          }
        }
      });
      
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Threat Intel Node',
        uri: chunk.web?.uri || '#'
      })) || [];

      return { ...JSON.parse(response.text || '{}'), groundingSources: grounding };
    } catch (e: any) {
      console.warn("API limit reached or error fetching live intel. Using local fallback.", e.message);
      return GeminiService.MOCK_INTEL;
    }
  }

  async analyzeUrl(url: string, modelName: string = 'RANDOM_FOREST'): Promise<ScanResult> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Perform a deep security audit on this URL: ${url}. 
        Simulate the analysis as if using the ${modelName} classifier. 
        If it's Random Forest, mention ensemble voting. If SVM, mention hyperplane margins. 
        Is it a phishing site? Provide technical reasoning.`,
        config: {
          systemInstruction: GeminiService.SYSTEM_PROMPT,
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskScore: { type: Type.NUMBER },
              riskLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
              verdict: { type: Type.STRING },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              technicalDetails: { type: Type.STRING }
            },
            required: ["riskScore", "riskLevel", "verdict", "threats", "recommendations"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Security Advisory',
        uri: chunk.web?.uri || '#'
      })) || [];

      return { ...data, groundingSources: grounding };
    } catch (e: any) {
      return {
        riskScore: 85,
        riskLevel: RiskLevel.HIGH,
        verdict: "LINK_ANALYSIS_INTERRUPTED: QUOTA_EXHAUSTED",
        threats: ["API_LIMIT_REACHED", "POTENTIAL_THREAT_DETECTION_OFFLINE"],
        recommendations: ["Manually verify domain age", "Check for SSL authenticity", "Avoid credential entry"],
        technicalDetails: "Analysis was cut short due to API rate limits. Assume high risk until manual verification."
      };
    }
  }

  async analyzeText(text: string, modelName: string = 'RANDOM_FOREST'): Promise<ScanResult> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this message for social engineering and phishing indicators: ${text}. 
        Simulate the analysis using the ${modelName} classifier logic.`,
        config: {
          systemInstruction: GeminiService.SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskScore: { type: Type.NUMBER },
              riskLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
              verdict: { type: Type.STRING },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["riskScore", "riskLevel", "verdict", "threats", "recommendations"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (e: any) {
      return {
        riskScore: 50,
        riskLevel: RiskLevel.MEDIUM,
        verdict: "TEXT_AUDIT_TIMEOUT",
        threats: ["ANALYSIS_PAYLOAD_UNPROCESSED"],
        recommendations: ["Check sender reputation manually", "Look for urgency markers"]
      };
    }
  }

  async analyzeImage(base64Data: string, mimeType: string = 'image/png', modelName: string = 'RANDOM_FOREST'): Promise<ScanResult> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: `Examine this UI screenshot for phishing markers. 
            Simulate the analysis using the ${modelName} classifier logic. 
            Analyze the URL bar, branding authenticity, form fields, and any suspicious call-to-actions.` }
          ]
        },
        config: {
          systemInstruction: GeminiService.SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskScore: { type: Type.NUMBER },
              riskLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
              verdict: { type: Type.STRING },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["riskScore", "riskLevel", "verdict", "threats", "recommendations"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (e: any) {
      return {
        riskScore: 100,
        riskLevel: RiskLevel.CRITICAL,
        verdict: "VISION_AUDIT_FAILURE: QUOTA_LIMIT",
        threats: ["IMAGE_PROCESSING_ABORTED"],
        recommendations: ["Review UI manually for font/logo mismatches"]
      };
    }
  }
}
