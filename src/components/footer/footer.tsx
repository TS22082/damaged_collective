import { component$ } from "@builder.io/qwik";
import { footerBase, footerContent, section, socialIcons } from "./footer.css";
import { BsInstagram, BsFacebook, BsTwitter } from "@qwikest/icons/bootstrap";

export default component$(() => {
  return (
    <footer class={footerBase}>
      <div class={footerContent}>
        <div class={section}>
          <h3>About Us</h3>
          <p>Learn more about our mission and values.</p>
        </div>
        <div class={section}>
          <h3>Contact</h3>
          <p>Email: info@damagedcollective.com</p>
        </div>
        <div class={section}>
          <h3>Follow Us</h3>
          <div class={socialIcons}>
            <BsInstagram /> Instagram
            <BsFacebook /> Facebook
            <BsTwitter /> Twitter
          </div>
        </div>
      </div>
      <p>© 2023 The Damaged Collective. All rights reserved.</p>
    </footer>
  );
});
