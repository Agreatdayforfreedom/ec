import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { signupThunk } from '@/features/auth/authApi';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Wrapper } from '@/components/wrapper';
import { Link } from 'react-router-dom';

const formSchema = z.object({
	email: z.string().min(2).max(50),
	username: z.string().min(3),
	password: z.string().min(3),
});

export const Signup = () => {
	const { error, loading } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		dispatch(
			signupThunk({
				email: values.email,
				username: values.username,
				password: values.password,
			}),
		);
	};

	return (
		<Wrapper title="Sign up">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email"
										className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Username"
										className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
										{...field}
									/>
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Password"
										type="password"
										className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
										{...field}
									/>
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end space-x-3 items-center">
						{error && <p className="text-red-500 text-sm">{error}</p>}
						<Button type="submit" variant={'magic'} disabled={loading}>
							Sign up
						</Button>
					</div>
					<div className="text-sm flex justify-center space-x-1">
						<span>Already have an account?</span>
						<Link to="/signin" className="text-magic-600 hover:underline">
							{' '}
							Sign In
						</Link>
					</div>
				</form>
			</Form>
		</Wrapper>
	);
};
