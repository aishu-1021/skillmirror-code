import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestResult {
  email: string;
  companyName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  weakAreas: string[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, companyName, score, totalQuestions, percentage, weakAreas }: TestResult = await req.json();

    console.log("Processing test result:", { email, companyName, percentage });

    const passed = percentage >= 75;

    let emailHtml: string;
    let subject: string;

    if (passed) {
      subject = `Congratulations! You've cleared the ${companyName} Aptitude Test`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; text-align: center;">🎉 Congratulations!</h1>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
            <h2 style="margin-top: 0;">You've Passed the Aptitude Test!</h2>
            <p style="font-size: 16px;">Dear Candidate,</p>
            <p style="font-size: 16px;">
              We are pleased to inform you that you have successfully cleared the aptitude test for <strong>${companyName}</strong>.
            </p>
          </div>

          <div style="background-color: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Test Results:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                <strong>Score:</strong> ${score}/${totalQuestions}
              </li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                <strong>Percentage:</strong> ${percentage.toFixed(1)}%
              </li>
              <li style="padding: 10px 0;">
                <strong>Status:</strong> <span style="color: #10b981;">✓ PASSED</span>
              </li>
            </ul>
          </div>

          <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Next Steps</h3>
            <p style="font-size: 16px;">
              You have been qualified for the <strong>Technical Round</strong>. You will receive further instructions shortly regarding the next phase of the interview process.
            </p>
            <p style="font-size: 16px; margin-bottom: 0;">
              Keep up the excellent work and prepare well for the upcoming technical assessment!
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Best wishes,<br>
              <strong>The ${companyName} Recruitment Team</strong>
            </p>
          </div>
        </div>
      `;
    } else {
      subject = `${companyName} Aptitude Test Results - Areas for Improvement`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #f59e0b; text-align: center;">Test Results - Keep Improving!</h1>
          
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Thank You for Taking the Test</h2>
            <p style="font-size: 16px;">Dear Candidate,</p>
            <p style="font-size: 16px;">
              Thank you for attempting the aptitude test for <strong>${companyName}</strong>. While you didn't meet the cutoff this time, we've prepared a detailed analysis to help you improve.
            </p>
          </div>

          <div style="background-color: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Test Results:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                <strong>Score:</strong> ${score}/${totalQuestions}
              </li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                <strong>Percentage:</strong> ${percentage.toFixed(1)}%
              </li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                <strong>Required:</strong> 75%
              </li>
              <li style="padding: 10px 0;">
                <strong>Gap:</strong> ${(75 - percentage).toFixed(1)}%
              </li>
            </ul>
          </div>

          <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #991b1b;">Areas Needing Improvement:</h3>
            <ul style="padding-left: 20px;">
              ${weakAreas.map(area => `<li style="padding: 5px 0; font-size: 15px;">${area}</li>`).join('')}
            </ul>
          </div>

          <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Recommended Learning Resources:</h3>
            
            <div style="margin: 15px 0;">
              <h4 style="margin: 10px 0; color: #1e40af;">📚 Online Platforms:</h4>
              <ul style="padding-left: 20px;">
                <li style="padding: 5px 0;"><a href="https://www.indiabix.com/" style="color: #2563eb;">IndiaBIX</a> - Comprehensive aptitude practice</li>
                <li style="padding: 5px 0;"><a href="https://www.geeksforgeeks.org/aptitude-questions-and-answers/" style="color: #2563eb;">GeeksforGeeks Aptitude</a> - Topic-wise questions</li>
                <li style="padding: 5px 0;"><a href="https://www.khanacademy.org/" style="color: #2563eb;">Khan Academy</a> - Math fundamentals</li>
              </ul>
            </div>

            <div style="margin: 15px 0;">
              <h4 style="margin: 10px 0; color: #1e40af;">📖 Books:</h4>
              <ul style="padding-left: 20px;">
                <li style="padding: 5px 0;">"Quantitative Aptitude" by R.S. Aggarwal</li>
                <li style="padding: 5px 0;">"A Modern Approach to Verbal & Non-Verbal Reasoning" by R.S. Aggarwal</li>
                <li style="padding: 5px 0;">"How to Prepare for Quantitative Aptitude" by Arun Sharma</li>
              </ul>
            </div>

            <div style="margin: 15px 0;">
              <h4 style="margin: 10px 0; color: #1e40af;">💡 Practice Tips:</h4>
              <ul style="padding-left: 20px;">
                <li style="padding: 5px 0;">Practice 20-30 questions daily from your weak areas</li>
                <li style="padding: 5px 0;">Focus on understanding concepts rather than memorizing</li>
                <li style="padding: 5px 0;">Time yourself to improve speed and accuracy</li>
                <li style="padding: 5px 0;">Review mistakes and understand the correct approach</li>
              </ul>
            </div>
          </div>

          <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">Keep Going!</h3>
            <p style="font-size: 16px; margin-bottom: 0;">
              Don't be discouraged! Every test is a learning opportunity. Focus on your weak areas, practice consistently, and you'll see improvement. We encourage you to retake the test after preparing with the resources provided above.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Best wishes for your preparation,<br>
              <strong>The ${companyName} Recruitment Team</strong>
            </p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "SkillMirror <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, passed }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-test-result function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
