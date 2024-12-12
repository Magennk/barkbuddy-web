
import '../css/Contact.css';

export default function Contact() {
  return (
    <div>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          We’d love to hear from you! Whether you have questions, feedback, or just
          want to share your dog's success story on BarkBuddy, we’re here to help.
        </p>

        <h3>How to Reach Us</h3>
        <ul>
          <li>
            <strong>Email:</strong> <a href="mailto:support@barkbuddy.com">support@barkbuddy.com</a>
          </li>
          <li>
            <strong>Phone:</strong> <a href="tel:+1234567890">(123) 456-7890</a>
          </li>
          <li>
            <strong>Office Hours:</strong> Monday - Friday, 9 AM - 6 PM
          </li>
        </ul>

        <h3>Social Media</h3>
        <p>Follow us on social media to stay updated:</p>
        <ul>
          <li>
            <a href="https://facebook.com/barkbuddy" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://instagram.com/barkbuddy" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://twitter.com/barkbuddy" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
        </ul>

        <h3>Our Location</h3>
        <p>
          <strong>Head Office:</strong><br />
          123 Bark Street,<br />
          Dogville, PA 54321
        </p>
      </section>

    </div>
  );
}
