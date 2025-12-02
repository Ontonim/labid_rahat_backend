export const generateThankYouEmail = (recipientName: string) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2f3d2e;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e1e8e3;">
        
        <!-- Header (Bottle Green + Simple Map Overlay) -->
        <div style="background: linear-gradient(135deg, #2b4d1c 0%, #3e6b29 100%);
                    text-align: center; padding: 40px 20px; position: relative; overflow: hidden;">
          
          <!-- Light Map Overlay -->
          <div style="background-image: url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png');
                      opacity: 0.1; position: absolute; inset: 0; z-index: 0;"></div>

          <div style="position: relative; z-index: 1;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600;">
              Thank You for Subscribing!
            </h1>
            <p style="color: #c9e8d3; margin: 10px 0 0; font-size: 14px;">
              Your journey with us starts here 🌿
            </p>
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <p style="font-size: 16px; margin: 0 0 15px;">
            Hi <strong style="color: #2b4d1c;">${recipientName || "Subscriber"}</strong>,
          </p>
          <p style="font-size: 15px; color: #4a554a; margin: 0 0 20px;">
            We're thrilled to have you join our community! You’ll now receive updates, insights, and stories directly to your inbox.
          </p>

          <!-- Highlight Section -->
          <div style="background: #f2f8f3; border-left: 4px solid #2b4d1c; padding: 15px 20px; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #2b4d1c; font-weight: 600;">📍 What's Coming Next</p>
            <ul style="margin: 10px 0 0 15px; padding: 0; color: #4a554a; font-size: 14px; line-height: 1.7;">
              <li>Exclusive updates and resources</li>
              <li>Early access to new projects</li>
              <li>Community tips and insights</li>
            </ul>
          </div>

          <p style="font-size: 15px; margin: 25px 0 0; color: #4a554a;">
            Stay tuned and enjoy being part of our journey 🌍
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f5faf7; text-align: center; padding: 20px; border-top: 1px solid #e0ebe3;">
          <p style="margin: 0; font-size: 12px; color: #7a8d7d;">
            You’re receiving this email because you subscribed to our newsletter.
          </p>
          <p style="margin: 8px 0 0; font-size: 11px; color: #9db3a2;">
            © 2025 My Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;
};
export const generateNewsletterEmail = (message: string) => {
  return `
    <div style="background-color: #006a4e; color: #ffffff; font-family: Arial, sans-serif; padding: 30px; border-radius: 12px;">
      <h2 style="text-align:center;">📰 Latest Update from Labid Rahat</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        ${message}
      </p>
      <p style="margin-top: 30px; font-size: 14px; text-align: center; opacity: 0.8;">
        — Sent with 💚 from <strong>Labid Rahat</strong><br/>
        <small>Thank you for being with us!</small>
      </p>
    </div>
  `;
};
