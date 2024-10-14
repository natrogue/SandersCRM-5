import React from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import {
    Edit, List, Datagrid, TextField, SimpleList, Create,
    TextInput, SimpleForm, NumberInput, required, DateInput, DateField,
    NumberField, DeleteButton as Delete
} from 'react-admin';

export const DonacionesEspecieList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.donorName}
                    secondaryText={record => `$${record.amount}`}
                    tertiaryText={record => new Date(record.date).toLocaleDateString()}
                />
            ) : (
                <Datagrid
                    sx={{
                        '& .RaDatagrid-headerCell': {
                            fontWeight: 'bold',
                            backgroundColor: '#c6d2e7',
                        },
                        '& .RaDatagrid-row': {
                            backgroundColor: '#F1F4F9',
                        },
                    }}
                >
                    <TextField source="id" label="ID" />
                    <TextField source="donorName" label="Nombre" />
                    <NumberField source="amount" label="Cantidad" />
                    <DateField source="date" label="Fecha" />
                    <TextField source="event" label="Evento" />
                </Datagrid>
            )}
        </List>
    );
};

export const DonacionesEspecieCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="donorName" label="Nombre" validate={[required()]} />
            <NumberInput source="amount" label="Cantidad" validate={[required()]} />
            <DateInput source="date" label="Fecha" />
            <TextInput source="event" label="Evento" />
        </SimpleForm>
    </Create>
);

export const DonacionesEspecieEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="donorName" label="Nombre" validate={[required()]} />
            <NumberInput source="amount" label="Cantidad" validate={[required()]} />
            <DateInput source="date" label="Fecha" validate={[required()]} />
            <TextInput source="event" label="Evento" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const DonacionesEspecieDelete = () => (
    <Delete>
        <SimpleForm>
            <TextInput source="donorName" label="Nombre" />
            <NumberInput source="amount" label="Cantidad" />
            <DateInput source="date" label="Fecha" />
            <TextInput source="event" label="Evento" />
        </SimpleForm>
    </Delete>
);
