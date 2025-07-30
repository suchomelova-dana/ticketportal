import { Dispatch, SetStateAction, useCallback } from "react";
import { Modal, Pressable, TextInput, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import { useAppStore } from "@/store/useAppStore";
import uuid from 'react-native-uuid';
import { AddPlayerForm } from "./AddPlayerForm";
import { commonStyles } from "@/styles/commonStyles";

type Props = {
    isDialogOpen: boolean,
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export function AddTeamDialog({isDialogOpen, setIsDialogOpen}: Props) {
    const addTeam = useAppStore(state => state.addTeam)

    const form = useForm<Omit<Team, "id">>({
        defaultValues: {
            name: "",
            players: [],
            logo: "",
        }
    });

    const onDialogSave: SubmitHandler<Omit<Team, "id">> = useCallback((data) => {
        const newItem :Team = {
            id: uuid.v4(),
            ...data,
        };

        addTeam(newItem);
        form.reset();
        setIsDialogOpen(false);
    }, [addTeam, form])

    const onDialogCancel = useCallback(() => {
      form.reset();
      setIsDialogOpen(false);
    }, [form, setIsDialogOpen]);

    return (
       <Modal
            visible={isDialogOpen}
            transparent
            onRequestClose={() => setIsDialogOpen(false)}
        >
            <View style={commonStyles.overlay}>
                <View style={commonStyles.modalContainer}>
                <Text style={commonStyles.title}>Přidání nového týmu</Text>

                <FormProvider {...form}>
                    <Text style={{fontWeight: 'bold'}}>Jméno týmu</Text>
                    <Controller
                        control={form.control}
                        name="name"
                        rules={{ 
                          required: 'Název je povinný',
                          minLength: {
                            value: 3,
                            message: 'Musí mít alespoň 3 znaky',
                          },
                         }}
                        render={({ field, fieldState }) => (
                          <>
                            <TextInput
                                style={commonStyles.input}
                                placeholder="Jméno týmu"
                                {...field}
                            />
                            {fieldState.error && <Text style={{color: 'red'}}>{fieldState.error.message}</Text>}
                          </>
                          
                        )}
                    />

                    <AddPlayerForm />
                </FormProvider>

                <View style={commonStyles.buttonRow}>
                    <Pressable
                        style={{...commonStyles.button, backgroundColor: "gray"}}
                        onPress={onDialogCancel}
                    >
                        <Text style={commonStyles.buttonText}>Zrušit</Text>
                    </Pressable>
                    <Pressable
                        style={{...commonStyles.button, backgroundColor: "blue"}}
                        onPress={form.handleSubmit(onDialogSave)}
                    >
                        <Text style={commonStyles.buttonText}>Přidat</Text>
                    </Pressable>
                </View>
                </View>
            </View>
        </Modal>

    )
}
