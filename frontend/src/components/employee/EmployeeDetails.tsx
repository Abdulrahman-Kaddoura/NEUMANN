import { useEffect, useRef, useState } from 'react';
import { resolvePhotoUrl } from '../../api/client';
import { useDeleteEmployeePhoto } from '../../hooks/employee/useDeleteEmployeePhoto';
import { useUploadEmployeePhoto } from '../../hooks/employee/useUploadEmployeePhoto';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useAuth } from '../../hooks/useAuth';
import { canManageEmployees } from '../../utils/roles';
import './EmployeeDetails.css'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

interface EmployeeDetailsProps {
    id: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string,
    address: string,
    city: string,
    county: string,
    email?: string,
    brandColor: string,
    photoUrl: string | null,
    detailsVisible: boolean,
    setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export function EmployeeDetails(
    { id,
        firstName,
        lastName,
        jobTitle,
        company,
        address,
        city,
        county,
        email,
        brandColor,
        photoUrl,
        detailsVisible,
        setDetailsVisible,
        setConfirmDeleteVisible,
        setEditFormVisible,

    }: EmployeeDetailsProps) {

    const { user } = useAuth();
    const panelRef = useRef<HTMLElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    useFocusTrap(panelRef, detailsVisible);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);

    const uploadPhoto = useUploadEmployeePhoto();
    const deletePhoto = useDeleteEmployeePhoto();

    useEffect(() => {
        setPreviewUrl(null);
        setPhotoError(null);
    }, [id]);

    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
            setPhotoError('Photo must be a PNG, JPEG, or WEBP image');
            return;
        }
        if (file.size > MAX_PHOTO_SIZE) {
            setPhotoError('Photo must be smaller than 5MB');
            return;
        }

        setPhotoError(null);
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);

        uploadPhoto.mutate({ id, file }, {
            onSettled: () => URL.revokeObjectURL(localUrl),
            onSuccess: () => setPreviewUrl(null),
            onError: () => {
                setPreviewUrl(null);
                setPhotoError('Failed to upload photo');
            },
        });
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && detailsVisible) {
                setDetailsVisible(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [detailsVisible, setDetailsVisible]);

    return (
        <>
            <div className={`panel-backdrop ${detailsVisible ? 'panel-backdrop-visible' : ''}`} onClick={() => setDetailsVisible(false)} />
            <aside
                ref={panelRef}
                className={`details-wrapper ${!detailsVisible ? 'invisible-details' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="employee-details-heading"
            >
                <div className='details-header' style={{ '--brand': brandColor } as React.CSSProperties}>
                    <button className='details-close-btn' onClick={() => { setDetailsVisible(false); setConfirmDeleteVisible(false) }}>×</button>
                    <div className='details-avatar-wrapper'>
                        {previewUrl || photoUrl ? (
                            <img className='details-avatar-photo' src={previewUrl ?? resolvePhotoUrl(photoUrl)} alt='' />
                        ) : (
                            <div className='details-avatar'>
                                {firstName[0]}{lastName[0]}
                            </div>
                        )}

                        {canManageEmployees(user?.role) && (
                            <>
                                <button
                                    type='button'
                                    className='details-avatar-edit-btn'
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadPhoto.isPending || deletePhoto.isPending}
                                    aria-label='Change photo'
                                    title='Change photo'
                                >
                                    ✎
                                </button>
                                {photoUrl && !previewUrl && (
                                    <button
                                        type='button'
                                        className='details-avatar-remove-btn'
                                        onClick={() => deletePhoto.mutate(id)}
                                        disabled={uploadPhoto.isPending || deletePhoto.isPending}
                                        aria-label='Remove photo'
                                        title='Remove photo'
                                    >
                                        ×
                                    </button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='image/png,image/jpeg,image/webp'
                                    className='details-avatar-input'
                                    onChange={handlePhotoChange}
                                />
                            </>
                        )}
                    </div>
                    <div id="employee-details-heading" className='details-name'>
                        {firstName} {lastName}
                    </div>
                </div>

                {photoError && <p className='details-photo-error'>{photoError}</p>}

                <div className='details-fields'>
                    <div className='details-field'>
                        <div className='details-label'>Job title</div>
                        <div className='details-value'>{jobTitle}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>Company</div>
                        <div className='details-value'>{company}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>Address</div>
                        <div className='details-value'>{address}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>City</div>
                        <div className='details-value'>{city}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>County</div>
                        <div className='details-value'>{county}</div>
                    </div>

                    <div className='details-field'>
                        <div className='details-label'>Email</div>
                        <div className='details-value'>{email ?? '—'}</div>
                    </div>
                </div>

                {canManageEmployees(user?.role) && (
                <div className='details-actions'>
                    <button type='button' className='details-edit-btn' onClick={() => { setEditFormVisible(true); setDetailsVisible(false) }}>Edit</button>
                    <button type='button' className='details-delete-btn' onClick={() => setConfirmDeleteVisible(true)}>Delete</button>
                </div>
                )}
            </aside>
        </>
    );
}