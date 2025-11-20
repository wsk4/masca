import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import PerfumesService from '../../pages/user/PerfumesService';

const PerfumesList = () => {
    const [Perfumes, setPerfumes] = useState([]);

    useEffect(() => {
        fetchPerfumes();
    }, []);

    const fetchPerfumes = () => {
        PerfumesService.getAllPerfumes().then(response => {
            setPerfumes(response.data);
        }).catch(error => {
            console.log('Error fetching perfumes:', error);
        });
    };
    return (
        <div>
            <h2>Perfumes List</h2>
            <div className="bg-blue-500 text-white p-10 text-center font-bold text-2xl">
                Perfumes
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nombre perfume</th>
                </tr>
            </thead>
            <tbody>{Perfumes.map(Perfumes => (
                <tr key={Perfumes.id}>
                    <td>{Perfumes.nombre}</td>
                    </tr>
            ))}
            </tbody>
        </table>
    </div>);
}
export default PerfumesList;