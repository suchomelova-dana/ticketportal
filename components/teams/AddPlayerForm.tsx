import { Pressable, TextInput, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Team } from "@/types/Team";
import { commonStyles } from "@/styles/commonStyles";
import { useState } from "react";


export function AddPlayerForm() {

    const { control } = useFormContext();

    const [newPlayer, setNewPlayer] = useState('');
    const [playerValidationError, setPlayerValidationError] = useState<string | null>(null)

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'players',
    });

    const onAddPlayer = () => {
        if (newPlayer.length > 2) {
            append(newPlayer);
            setNewPlayer('');
            setPlayerValidationError(null)
        } else {
            setPlayerValidationError('Player musí mít alespoň 2 znaky')
        }
    }

    return (
        <>
            <Text style={{fontWeight: 'bold'}}>Hráči</Text>
            {
                fields.map((field, index) => (
                    <View key={field.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4  }}>
                        <Controller
                            control={control}
                            name={`players.${index}`}
                            rules={{ 
                            required: 'Jméno hráče je povinné',
                            minLength: {
                                value: 2,
                                message: 'Musí mít alespoň 2 znaky',
                            },
                            }}
                            render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={commonStyles.input}
                                placeholder={'Jméno hráče'}
                                value={value}
                                onChangeText={onChange}
                            />
                            )}
                        />
                        <Pressable onPress={() => remove(index)}>
                            <Text style={{ color: 'red', padding: 5 }}>Odebrat</Text>
                        </Pressable>
                    </View>
                ))
            }

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={commonStyles.input}
                    value={newPlayer}
                    onChangeText={setNewPlayer}
                    placeholder="Nový hráč"
                />
                <Pressable onPress={onAddPlayer}>
                    <Text style={{ color: 'green', padding: 5 }}>Přidat</Text>
                </Pressable>
                {
                    playerValidationError && <Text style={{color: "red"}}>Musí mít alespoň 2 znaky</Text>
                }
            </View>

            <Pressable onPress={() => append('')}>
                <Text>+ Přidat hráče</Text>
            </Pressable>
      </>
    )
}