import { useTaskContext } from '../hooks/useTaskContext';
import { FILTERS_BUTTONS } from '../utils/consts';
import { FilterValue } from '../utils/types';

const Filters: React.FC = () => {
	const { filterSelected, handleFilterChange } = useTaskContext();

	const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		handleFilterChange({ filter });
	};

	return (
		<ul className='filters'>
			{Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
				const isSelected = key === filterSelected;
				const className = isSelected ? 'selected' : '';

				return (
					<li key={key}>
						<a href={href} className={className} onClick={handleClick(key as FilterValue)}>
							{literal}
						</a>
					</li>
				);
			})}
		</ul>
	);
};

export default Filters;
