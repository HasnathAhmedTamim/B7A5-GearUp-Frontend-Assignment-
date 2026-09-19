import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex items-center gap-3 text-muted-foreground">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                <span>Loading...</span>
            </div>
        </div>
    );
}
