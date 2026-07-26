import { Link } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/20 text-primary">
              <Heart className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-display text-lg font-semibold">Al Meer Hospital</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            World-class care, delivered with warmth. A next-generation hospital
            focused on precision medicine, comfort, and every patient's story.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/doctors" className="hover:text-foreground">Doctors</Link></li>
            <li><Link to="/appointment" className="hover:text-foreground">Book Appointment</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Reach us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Main Boulevard, Karachi</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +92 300 000 0000</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> care@almeerhospital.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Al Meer Hospital. All rights reserved.
      </div>
    </footer>
  );
}
