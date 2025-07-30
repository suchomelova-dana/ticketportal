import { Match } from "@/types/Match";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Controller, FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Modal, Pressable } from "react-native";
import { View, Text } from "../Themed";
import { commonStyles } from "@/styles/commonStyles";
import { Picker } from '@react-native-picker/picker';
import { useAppStore } from "@/store/useAppStore";
import uuid from 'react-native-uuid';

type Props = {
    isDialogOpen: boolean,
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

const MIN_TEAMS_COUNT = 2;

export function AddMatchDialog({isDialogOpen, setIsDialogOpen}: Props) {
    const teams = useAppStore(state => state.teams);
    const addMatch = useAppStore(state => state.addMatch);
    const canCreateMatch = useMemo(() => teams.length >= MIN_TEAMS_COUNT, [teams.length]);

    const form = useForm<Omit<Match, "id">>({
        defaultValues: {
            teamA: '',
            teamB: '',
            date: null,
            score: {
                teamA: 0,
                teamB: 0,
            }
        }
    });

    const selectedTeamA = useWatch({ control: form.control, name: 'teamA' });
    const selectedTeamB = useWatch({ control: form.control, name: 'teamB' });

     const onDialogCancel = useCallback(() => {
          form.reset({
            teamA: null,
            teamB: null,
            date: null,
            score: {
                teamA: 0,
                teamB: 0,
            }
          });
          setIsDialogOpen(false);
        }, [form, setIsDialogOpen]);

        const onDialogSave: SubmitHandler<Omit<Match, "id">> = useCallback((data) => {
            console.log(data)
            const newItem :Match = {
                id: uuid.v4(),
                ...data,
            };

            addMatch(newItem);
            form.reset();
            setIsDialogOpen(false);
        }, [addMatch, form])

    return (
        <Modal
            visible={isDialogOpen}
            transparent
            onRequestClose={() => setIsDialogOpen(false)}
        >
            <View style={commonStyles.overlay}>
                <View style={commonStyles.modalContainer}>
                <Text style={commonStyles.title}>Přidání nového zápasu</Text>

                {
                    !canCreateMatch &&  <Text>Nemáte dostatečný počet týmů na vytvoření zápasu</Text>
                }

                {
                    canCreateMatch && (
                        <FormProvider {...form}>
                            <Text style={{fontWeight: 'bold'}}>Tým A:</Text>
                            <Controller
                                control={form.control}
                                name="teamA"
                                rules={{ required: 'Tým je povinný' }}
                                render={({ field }) => (
                                <>
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                        >
                                            <Picker.Item label="Vyber tým..." value="" enabled={false} />
                                            {
                                                teams
                                                    .filter((team) => team.id !== selectedTeamB)
                                                    .map((team) => <Picker.Item label={team.name} value={team.id} />)
                                            }
                                    </Picker>
                                </>
                                
                                )}
                            />

                            <Text style={{fontWeight: 'bold'}}>Tým B:</Text>
                            <Controller
                                control={form.control}
                                name="teamB"
                                rules={{ required: 'Tým je povinný' }}
                                render={({ field }) => (
                                <>
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                        >
                                            <Picker.Item label="Vyber tým..." value="" enabled={false} />
                                            {
                                                teams
                                                    .filter((team) => team.id !== selectedTeamA)
                                                    .map((team) => <Picker.Item label={team.name} value={team.id} />)
                                            }
                                    </Picker>
                                </>
                                
                                )}
                            />
                        </FormProvider>
                    )
                }


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