import type { ReactNode } from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { GrCatalog } from "react-icons/gr";
import { LuMail } from "react-icons/lu";
import { PiLinkedinLogo } from "react-icons/pi";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import "./styles/pages/developer.scss";

export default function Developer() {
  return (
    <Layout>
      <div className="dev">
        <h1>The Developer</h1>

        <div className="dev-console">
          <div className="dev-console-left">
            <div className="dev-image">
              <img src="/dev.jpeg" alt="The Developer" />
            </div>
          </div>
          <div className="dev-console-right">
            <h2 style={{ marginBottom: "1rem" }}>Ssadiq Roy</h2>
            <p className="cl-text">
              I am a full stack developer with over five (5) years of experience in web development. <br /> I build back-end systems and APIs using
              Node.js/Express or Bun.js/Elysia with MongoDB and mongoose or SQL and Sequelize. I use vanilla javascript, typescript, react or next.js
              to build front end applications.
            </p>
            <p className="cl-text">
              Writing code is more of a hobby. I have designed and built <strong>Huge</strong> private platform covering back-end engines and
              front-end web apps and deployed to cPanels, hosting platforms and dedicated servers in Kubernetes.
            </p>
            <p className="cl-text">
              Now I am into freelancing or job hire. This is a small application for my portfolio. It's a simple react app that let's test your
              knowledge in a subject.
            </p>
          </div>
        </div>

        <div className="dev-hire">
          <strong className="tag tag-green" style={{ maxWidth: "max-content" }}>
            Hire me / Contact
          </strong>
          <div className="dev-hire-contacts left-items">
            <DevHire name="Email" link="mailto:ssadiqueroy@gmail.com" icon={<LuMail />} />
            <DevHire name="WhatsApp" link="https://wa.me/ssadiqroy" icon={<FaWhatsapp />} />
            <DevHire name="Facebook" link="https://web.facebook.com/SsadiqRoy" icon={<AiOutlineFacebook />} />
            <DevHire name="Instagram" link="https://instagram.com/ssadiqroy" icon={<FaInstagram />} />
            <DevHire name="LinkedIn" link="https://www.linkedin.com/in/samuel-nigal-3491251bb/" icon={<PiLinkedinLogo />} />
            <DevHire name="Portfolio" link="https://ssadiqroy.vercel.app/" icon={<GrCatalog />} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function DevHire({ link, icon, name }: { link: string; name: string; icon: ReactNode }) {
  return (
    <Link to={link} className="dev-hire-contact">
      <span className="dev-hire-contact-icon">{icon}</span>
      {name}
    </Link>
  );
}
