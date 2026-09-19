import Link from "next/link";
import { Mountain } from "lucide-react";

import Container from "./Container";

export default function Footer() {
    return (
        <footer className="border-t bg-card">
            <Container className="py-10">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <Link href="/" className="inline-flex items-center gap-2 font-semibold">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Mountain className="h-4 w-4" aria-hidden="true" />
                        </span>
                        GearUp
                    </Link>
                    <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
                        <Link href="/gear" className="hover:text-foreground">Browse gear</Link>
                        <Link href="/about" className="hover:text-foreground">About</Link>
                        <Link href="/register" className="hover:text-foreground">Become a provider</Link>
                    </nav>
                    <p className="text-sm text-muted-foreground">© 2026 GearUp. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}
