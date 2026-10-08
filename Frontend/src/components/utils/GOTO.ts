interface GotoProps {
  Link: string;
  NewTab?: boolean;
}

export default function Goto({ Link, NewTab = false }: GotoProps) {
  if (NewTab) {
    window.open(Link, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = Link;
  }
}
