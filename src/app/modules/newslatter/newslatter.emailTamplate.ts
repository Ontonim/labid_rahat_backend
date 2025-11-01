export const generateThankYouEmail = (recipientName: string) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2c3e2f;">
      <div style="max-width: 600px; margin: auto; padding: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        
        <!-- Header with bottle green map background -->
        <div style="background: linear-gradient(135deg, #2d5016 0%, #3a6b1f 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
          <!-- Map-inspired circular elements -->
          <div style="position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: rgba(255,255,255,0.05); border-radius: 50%; z-index: 0;"></div>
          <div style="position: absolute; bottom: -30%; left: -5%; width: 250px; height: 250px; background: rgba(255,255,255,0.03); border-radius: 50%; z-index: 0;"></div>
          <div style="position: relative; z-index: 1;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Thank You for Subscribing!</h1>
            <p style="color: #c8e6c9; margin: 8px 0 0 0; font-size: 14px;">Join our community</p>
          </div>
        </div>

        <!-- Content area -->
        <div style="padding: 40px 30px; background: #ffffff;">
          <p style="margin: 0 0 20px 0; font-size: 16px; color: #2c3e2f;">
            Hi <strong style="color: #2d5016;">${recipientName || "Subscriber"}</strong>,
          </p>

          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #4a5568;">
            We're excited to have you join our community! As a subscriber, you're now part of our inner circle.
          </p>

          <!-- Map-inspired section with portfolio portfolio information -->
          <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #f0f8f3 0%, #e8f4ed 100%); border-left: 4px solid #2d5016; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #2d5016; font-weight: 600;">📍 What's Next</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #4a5568; line-height: 1.6;">
              ✓ Explore my latest blog posts<br />
              ✓ Get early access to updates<br />
              ✓ Receive exclusive content
            </p>
          </div>

          <p style="margin: 25px 0 0 0; font-size: 15px; line-height: 1.7; color: #4a5568;">
            Check your inbox for curated content and insights. Welcome to the journey!
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f5f9f7; padding: 25px 30px; border-top: 1px solid #d4e8dc; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #7a8d7d;">
            You're receiving this because you subscribed to our newsletter.
          </p>
          <p style="margin: 10px 0 0 0; font-size: 11px; color: #9db3a2;">
            © 2025 My Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `
}
