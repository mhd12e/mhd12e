export default function Footer() {
    return (
        <footer className="bg-muted/50 py-10 border-t">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-semibold text-lg">Mohamed Elsayed</p>
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="https://www.youtube.com/@mhd12e" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">YouTube</a>
                    <a href="https://github.com/mhd12e" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
                    <a href="https://www.linkedin.com/in/mhd12/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
