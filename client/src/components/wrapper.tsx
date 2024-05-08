import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Props {
	title: string;
	children: React.ReactNode;
}

export const Wrapper = ({ children, title }: Props) => {
	return (
		<Card className="w-8/12 sm:w-1/2 md:w-1/3 mx-auto mt-10 bg-magic-800 border-magic-550">
			{title && (
				<CardHeader className="p-4 text-xl font-semibold">
					<h1>{title}</h1>
				</CardHeader>
			)}
			<CardContent className={!title ? 'mt-3' : ''}>{children}</CardContent>
		</Card>
	);
};
