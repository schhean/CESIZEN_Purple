"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./ProfileForm";

type PasswordChangeFormData = {
    currentPasswordConnexion: string;
    newPasswordInscription: string;
    confirmPasswordInscription: string;
};

interface PasswordChangeModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

export default function PasswordChangeModal({ isOpen, onOpenChange, onClose }: PasswordChangeModalProps) {
    const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
    const [isVisibleNew, setIsVisibleNew] = useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, reset, setError } = useForm<PasswordChangeFormData>();

    const onSubmit = async (data: PasswordChangeFormData) => {
        try {
            const response = await fetch("/api/user/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: data.currentPasswordConnexion,
                    newPassword: data.newPasswordInscription,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (response.status === 401) {
                    setError("currentPasswordConnexion", {
                        type: "manual",
                        message: errorData.message,
                    });
                    return;
                }
                throw new Error(errorData.message || "Erreur lors du changement de mot de passe.");
            }

            onClose();
            addToast({
                title: "Mot de passe modifié",
                description: "Votre mot de passe a été mis à jour avec succès.",
                color: "success",
                timeout: 5000,
            });
            reset();

        } catch (error: any) {
            console.error("Erreur:", error);
            addToast({
                title: "Erreur",
                description: "Une erreur est survenue lors du changement de mot de passe.",
                color: "danger",
                timeout: 5000,
            });
        }
    };

    const inputClassNames = {
        inputWrapper: "dark:bg-transparent dark:border-zinc-700",
        input: "dark:text-white dark:placeholder:text-zinc-400",
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            backdrop="blur"
            size="md"
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Changer le mot de passe</ModalHeader>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody className="flex flex-col gap-4">
                                <Input
                                    label="Mot de passe actuel"
                                    placeholder="******"
                                    variant="bordered"
                                    classNames={inputClassNames}
                                    type={isVisibleCurrent ? "text" : "password"}
                                    endContent={
                                        <button className="focus:outline-none" onClick={() => setIsVisibleCurrent(!isVisibleCurrent)} type="button">
                                            {isVisibleCurrent ? <EyeFilledIcon className="text-2xl text-default-400" /> : <EyeSlashFilledIcon className="text-2xl text-default-400" />}
                                        </button>
                                    }
                                    {...register("currentPasswordConnexion", {
                                        required: "Veuillez entrer votre mot de passe actuel."
                                    })}
                                    isInvalid={!!errors.currentPasswordConnexion}
                                    errorMessage={errors.currentPasswordConnexion?.message}
                                />

                                <Input
                                    label="Nouveau mot de passe"
                                    placeholder="******"
                                    variant="bordered"
                                    classNames={inputClassNames}
                                    type={isVisibleNew ? "text" : "password"}
                                    endContent={
                                        <button className="focus:outline-none" onClick={() => setIsVisibleNew(!isVisibleNew)} type="button">
                                            {isVisibleNew ? <EyeFilledIcon className="text-2xl text-default-400" /> : <EyeSlashFilledIcon className="text-2xl text-default-400" />}
                                        </button>
                                    }
                                    {...register("newPasswordInscription", {
                                        required: "Veuillez entrer un nouveau mot de passe.",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
                                        },
                                        validate: (value) => value !== watch("currentPasswordConnexion") || "Le nouveau mot de passe doit être différent de l'actuel."
                                    })}
                                    isInvalid={!!errors.newPasswordInscription}
                                    errorMessage={errors.newPasswordInscription?.message}
                                />

                                <Input
                                    label="Confirmer le nouveau mot de passe"
                                    placeholder="******"
                                    variant="bordered"
                                    classNames={inputClassNames}
                                    type={isVisibleConfirm ? "text" : "password"}
                                    endContent={
                                        <button className="focus:outline-none" onClick={() => setIsVisibleConfirm(!isVisibleConfirm)} type="button">
                                            {isVisibleConfirm ? <EyeFilledIcon className="text-2xl text-default-400" /> : <EyeSlashFilledIcon className="text-2xl text-default-400" />}
                                        </button>
                                    }
                                    {...register("confirmPasswordInscription", {
                                        required: "Veuillez confirmer votre nouveau mot de passe.",
                                        validate: (value) => value === watch("newPasswordInscription") || "Les mots de passe ne correspondent pas."
                                    })}
                                    isInvalid={!!errors.confirmPasswordInscription}
                                    errorMessage={errors.confirmPasswordInscription?.message}
                                />
                            </ModalBody>

                            <ModalFooter className="flex flex-col sm:flex-row gap-3">
                                <Button color="danger" variant="light" className="w-full sm:w-auto" onPress={onClose}>
                                    Annuler
                                </Button>

                                <Button className="bg-purple-800 text-white font-semibold w-full sm:w-auto" type="submit">
                                    Modifier
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

/**
 * ==============================================================================
 * DOCUMENTATION : PasswordChangeModal (Client Component)
 * ==============================================================================
 * 
 * 📌 VUE D'ENSEMBLE
 * Ce composant est une fenêtre modale interactive permettant à l'utilisateur de
 * modifier son mot de passe. Il intègre la validation de formulaire en temps réel,
 * la gestion de la visibilité des champs et la communication avec l'API.
 * 
 * 🛠️ ÉTATS LOCAUX (useState)
 * - isVisibleCurrent / isVisibleNew / isVisibleConfirm : Gèrent indépendamment
 *   l'affichage "en clair" ou "masqué" de chaque champ de saisie (type="text" vs "password").
 * 
 * ⚙️ LOGIQUE DE FORMULAIRE (react-hook-form)
 * - register : Enregistre les inputs et définit les règles de validation (pattern, required).
 * - watch : Permet de comparer les valeurs en temps réel (ex: nouveau vs confirmation).
 * - reset : Réinitialise le formulaire après un succès.
 * - setError : Permet d'injecter manuellement des erreurs provenant du serveur.
 * 
 * 📘 FONCTIONS PRINCIPALES
 * 
 * 1. onSubmit(data: PasswordChangeFormData) :
 *    - Rôle : Gère l'envoi des données à la route API `/api/user/change-password`.
 *    - Processus :
 *        a. Envoie une requête PUT avec le mot de passe actuel et le nouveau.
 *        b. Si le serveur renvoie 401 (Ancien mot de passe incorrect), utilise 
 *           `setError` pour marquer le champ spécifiquement.
 *        c. En cas de succès : Ferme la modale, affiche un Toast de succès et reset les champs.
 *        d. En cas d'erreur réseau/serveur : Affiche un Toast d'erreur générique.
 * 
 * 2. setIsVisible[Field] :
 *    - Rôle : Fonctions anonymes déclenchées par les boutons d'icône (œil) 
 *      situés en fin d'input pour basculer le type du champ.
 * 
 * 🔒 RÈGLES DE VALIDATION (Côté Client)
 * - Pattern Regex : Force la complexité (8+ caractères, Maj, Min, Chiffre, Caractère spécial).
 * - Validation Différentielle : Le nouveau MDP doit être différent de l'actuel.
 * - Validation de Correspondance : La confirmation doit être strictement identique au nouveau MDP.
 * 
 * 🎨 STYLISATION
 * - Utilise HeroUI (anciennement NextUI) pour les composants visuels.
 * - `inputClassNames` : Assure une intégration propre avec le mode sombre via Tailwind CSS.
 * ==============================================================================
 */