import React, { useState } from 'react';
import addIcon from '../images/icons-add.png'
import AddDepartmentForm from './AddDepartmentForm';
import ClickableCard from './UI/ClickableCard/ClickableCard';
import { useNavigate } from 'react-router-dom';

const DepartmentsSection = ({isDepartmentLoading, departments, title}) => {

    const navigate = useNavigate();
    const [addModal, setAddModal] = useState(false);

    if (isDepartmentLoading)
        return(<div></div>);

    if (!departments.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Departments didn't found!
            </h1>
        )
    }

    return (
        <div>
            <AddDepartmentForm modal={addModal} setModal={setAddModal}/>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className='cards_container'>
                <div className='grid'>
                    {departments.map((department) =>
                        <ClickableCard
                            key={department.id}
                            id={department.id}
                            title={department.title}
                            summary={department.summary}
                            onClickAction={() => navigate(`/departments/${department.id}`)}/>)
                    }
                    <ClickableCard
                        key={-1}
                        id={0}
                        isAdditionalCard='true'
                        className='addCard'
                        onClickAction={() => setAddModal(true)}>
                        <div className='addCardContent'></div>
                    </ClickableCard>
                </div>
            </div>
            
        </div>
    );
};


export default DepartmentsSection;