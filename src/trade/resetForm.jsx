import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ResetForm(props) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/trade');
    });
}