import React from 'react'
import Swal from 'sweetalert2'

export default function Alert(props) {

    const popup = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: props.alert.status,
            title: props.alert.message
        })
    }

    if (props.alert != null) {
        popup();
    }

    return (
        <div className=""></div>
    )
}