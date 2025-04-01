import AdminProvider from "@/providers/admin-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <AdminProvider>{children}</AdminProvider>;
}
