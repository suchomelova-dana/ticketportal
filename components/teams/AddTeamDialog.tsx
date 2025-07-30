import { Dispatch, SetStateAction, useCallback } from "react";
import { Modal, Pressable, TextInput, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import { useAppStore } from "@/store/useAppStore";
import { v4 as uuidv4 } from 'uuid';
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
            id: uuidv4(),
            ...data,
        };

        console.log(newItem)
        addTeam(newItem);
        setIsDialogOpen(false);
        form.reset();
    }, [addTeam, form])

    return (
       <Modal
            visible={isDialogOpen}
            transparent
            onRequestClose={() => setIsDialogOpen(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                <Text style={styles.title}>Přidání nového týmu</Text>

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

                <View style={styles.buttonRow}>
                    <Pressable
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => setIsDialogOpen(false)}
                    >
                        <Text style={styles.buttonText}>Zrušit</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonSubmit]}
                        onPress={form.handleSubmit(onDialogSave)}
                    >
                        <Text style={styles.buttonText}>Přidat</Text>
                    </Pressable>
                </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonCancel: {
    backgroundColor: '#999',
  },
  buttonSubmit: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});