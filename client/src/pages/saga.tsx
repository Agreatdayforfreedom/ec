import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Saga as ISaga } from '../interfaces';
import axios from 'axios';
import Loader from '../components/loader';
import { Separator } from '../components/ui/separator';
import { Stars } from '../components/review/stars';
import { Gem } from 'lucide-react';

export const Saga = () => {
	const [saga, setSaga] = useState<ISaga>();
	const [loading, setLoading] = useState<boolean>(true);
	const param = useParams();
	useEffect(() => {
		async function fetch() {
			const res = await axios.get(`/saga/${param.id}`);
			setSaga(res.data);
			setLoading(false);
		}
		fetch();
	}, []);

	if (loading || !saga) return <Loader />;
	return (
		<div>
			<div>
				<div className="w-[50%] mx-auto mt-4 flex flex-col space-y-2">
					<span className="text-4xl font-semibold text-magic-100">
						{saga.name}
					</span>
					<span className="font-bold">
						Serie of {saga.products.length} books
					</span>
					<span className="text-sm">by {saga.products[0].author}</span>
					<p>{saga.description}</p>
				</div>
			</div>
			<Separator className="my-3" />
			<div className="space-y-2">
				{saga.products.map((x) => (
					<div className="flex mx-auto w-11/12 md:w-3/4">
						<img src={x.image} className="w-20" />
						<div className="flex flex-col px-2">
							<Link
								to={`/product/${x.id}`}
								className="hover:underline underline-offset-2"
							>
								{x.title}
							</Link>
							<span className="md:w-1/2 line-clamp-2 text-sm text-magic-100/75">
								{x.description}
							</span>
							<div className="flex space-x-1 items-center mt-2">
								<Stars _static stars={x.rating.avg} size={15} />
								<span className="text-sm">({x.rating._count?.reviews})</span>
							</div>
							<span className="font-semibold flex items-center space-x-2">
								<span>${x.price}</span>
								<Separator
									orientation="vertical"
									className="h-3/4 bg-magic-600 "
								/>
								<div className="flex items-center ">
									<Gem size={15} className="stroke-sky-600" />{' '}
									<span>{x.gems_price}</span>
								</div>
							</span>
						</div>
						<div>
							<span className="text-2xl font-bold font-mono">#{x.order}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
