export interface CreateAddressDto {
    recipientName: string;
    phone: string;
    addressLine: string;
    district: string;
    city: string;
    isDefault?: boolean;
}

export interface UpdateAddressDto {
    recipientName?: string;
    phone?: string;
    addressLine?: string;
    district?: string;
    city?: string;
    isDefault?: boolean;
}
