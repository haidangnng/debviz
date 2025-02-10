import { Button } from "@/components/ui/button";
import { Ghost, Github, HeartCrack, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full h-12 border-t flex justify-between items-center p-2">
      <p className="flex gap-2 items-center">
        © 2025. No rights reserved. From oLmaoster with{" "}
        <span>
          <HeartCrack size={14} />
        </span>
      </p>
      <div className="flex gap-4 items-center">
        <Button className="rounded-full aspect-square" variant="outline">
          <a href="#" target="_blank">
            <Github />
          </a>
        </Button>

        <Button className="rounded-full aspect-square" variant="outline">
          <a href="#" target="_blank">
            <Linkedin />
          </a>
        </Button>
      </div>
    </div>
  );
}
