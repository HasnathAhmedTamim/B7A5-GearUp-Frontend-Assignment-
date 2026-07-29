import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-white">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        GearUp
                    </Link>

                    <nav className="hidden gap-6 md:flex">
                        <Link href="/">Home</Link>
                        <Link href="/gear">Gear</Link>
                        <Link href="/about">About</Link>
                    </nav>

                    <div className="flex gap-3">
                        <Link
                            href="/auth/login"
                            className="rounded-md border px-4 py-2"
                        >
                            Login
                        </Link>

                        <Link
                            href="/auth/register"
                            className="rounded-md bg-blue-600 px-4 py-2 text-white"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </Container>
        </header>
    );
}