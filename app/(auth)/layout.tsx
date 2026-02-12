const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-amber-400 h-full">
            {children}
        </div>
    );
}
export default AuthLayout;