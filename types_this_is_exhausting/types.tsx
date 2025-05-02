



export interface Field {

    severity: "H" | "M" | "L";
    title: string;
    complain: string;
    time_stamp: string;
    is_complete: string;
    type: string;
    user_id: number;
    admin_id: number;
}


export interface Complains {
    id: number;
    user_id: UserField

    severity: "H" | "M" | "L";
    title: string;
    complain: string;
    time_stamp: string;
    is_complete: string;
    type: string;
    admin_id: number; 
}
export interface Fields {
    field: Field
}

export interface AllFields {
    complainFields: Field;
    userFields: UserField;
    adminFields: UserField;

}

export interface UserField {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    time_stamp: string;
    pk: number;
}



export interface Users {
    fields: UserField;
    pk: number
}

export interface BasicResponse {
    error: any;
    message: any;
    data: any;
}

export type login = boolean;

export interface Admin {
    id: number,
    data: UserField
}

export interface complainSelected {
    index: number | 0;
}

export interface AllAdmins {
    id: number;
    department: string;
    user_id: UserField;
}