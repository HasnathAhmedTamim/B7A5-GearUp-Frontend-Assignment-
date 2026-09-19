import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
            <div className="surface-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative z-10 mx-auto w-full max-w-md">
                <LoginForm />
            </div>
        </main>
    );
}
