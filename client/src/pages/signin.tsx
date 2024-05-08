import { ElementRef, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '../hooks/rtk';
import { signinThunk } from '../features/auth/authApi';

export const Signin = () => {
	const inputEmailRef = useRef<ElementRef<'input'>>(null);
	const inputPasswordRef = useRef<ElementRef<'input'>>(null);

	const { error } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const onSubmit = async (e: any) => {
		e.preventDefault();

		dispatch(
			signinThunk({
				email: inputEmailRef.current?.value!,
				password: inputPasswordRef.current?.value!,
			}),
		);
	};

	return (
		<div className="bg-red-400">
			<form onSubmit={onSubmit}>
				<Input ref={inputEmailRef} type="email" placeholder="Email" />
				<Input ref={inputPasswordRef} type="password" placeholder="Password" />
				<Button type="submit">Signin</Button>
				{error ? <p>{error}</p> : <></>}
			</form>
		</div>
	);
};
