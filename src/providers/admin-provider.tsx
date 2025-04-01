"use client";

import { AuthContext } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

interface Props {
	children?: ReactNode;
}

export default function AdminProvider({ children }: Props) {
	const router = useRouter();
	const { currentUser, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!loading && !currentUser) router.push("/login");
	}, [currentUser, router, loading]);

	return children;
}
