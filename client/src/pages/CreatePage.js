import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/create');
    }, [])

    return (
        <div>
            <h1>Create</h1>
        </div>
    )
}

export default CreatePage