import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Checkbox } from "@heroui/checkbox";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";
import { signIn } from "next-auth/react";

/**
 * Composants SVG pour les icônes de l'interface utilisateur.
 * Utilisés dans les champs d'entrée pour illustrer la sécurité (cadenas)
 * et la visibilité des mots de passe (œil ouvert/fermé).
 */
export const LockIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeSlashFilledIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};

/**
 * Type décrivant la structure des données attendues pour une tentative de connexion.
 */
type userConnexionData = {
  emailConnexion: string;
  passwordConnexion: string;
};

/**
 * Type décrivant la structure des données attendues lors de l'inscription d'un nouvel utilisateur.
 */
type userInscriptionData = {
  firstName: string;
  lastName: string;
  emailInscription: string;
  passwordInscription: string;
  confirmPasswordInscription: string;
  acceptedCGU: boolean;
  readPrivacy: boolean;
};

/**
 * Composant principal d'authentification gérant la connexion et l'inscription
 * au sein d'une fenêtre modale.
 */
export default function Auth() {
  /**
   * @state Hooks HeroUI gérant l'état d'ouverture/fermeture de la modale.
   */
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  /**
   * @state { "login" | "register" | "forgotPassword" } authMode
   * Détermine quel formulaire afficher à l'intérieur de la modale.
   */
  const [authMode, setAuthMode] = useState<
    "login" | "register" | "forgotPassword"
  >("login");

  /**
   * Ouvre la modale et force l'affichage du mode de connexion par défaut.
   */
  const handleOpen = () => {
    setAuthMode("login");
    onOpen();
  };

  /**
   * @state isVisible / isVisibleSecond
   * Permettent de masquer/afficher le texte des champs de mots de passe.
   */
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisibleSecond, setIsVisibleSecond] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilitySecond = () => setIsVisibleSecond(!isVisibleSecond);

  /**
   * Hook de gestion de formulaire via react-hook-form.
   * Permet la validation, la récupération des valeurs, le reset et la gestion des erreurs.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm();

  /**
   * @state dataUsersConnexion / dataUsersInscription
   * Stocke temporairement l'historique des soumissions de formulaires dans le client.
   */
  const [dataUsersConnexion, setDataUsersConnexion] = useState<
    userConnexionData[]
  >([]);
  const [dataUsersInscription, setDataUsersInscription] = useState<
    userInscriptionData[]
  >([]);

  /**
   * Sauvegarde les données soumises dans l'état local correspondant selon le mode actuel.
   * @param {any} data - Les données validées par react-hook-form
   */
  const getData = (data: any) => {
    if (authMode === "login") {
      const newData: userConnexionData = {
        emailConnexion: data.emailConnexion,
        passwordConnexion: data.passwordConnexion,
      };

      setDataUsersConnexion([...dataUsersConnexion, newData]);
    } else if (authMode === "register") {
      const newData: userInscriptionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        emailInscription: data.emailInscription,
        passwordInscription: data.passwordInscription,
        confirmPasswordInscription: data.confirmPasswordInscription,
        acceptedCGU: data.acceptedCGU,
        readPrivacy: data.readPrivacy,
      };

      setDataUsersInscription([...dataUsersInscription, newData]);
    }
  };

  /**
   * Envoie la requête d'inscription à l'API locale.
   * Gère les erreurs de conflit (email déjà pris) via react-hook-form.
   * En cas de succès de la création du compte, tente de connecter silencieusement
   * l'utilisateur en utilisant le provider "credentials" de Next-Auth avec les
   * données fraîchement soumises (emailInscription et passwordInscription).
   * Si la connexion automatique échoue, bascule la modale en mode "login" avec
   * un avertissement. Si elle réussit, ferme la modale, affiche un message
   * de bienvenue global et réinitialise les champs.
   * @param {userInscriptionData} data - Les données d'inscription validées.
   */
  const handleRegister = async (data: userInscriptionData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 409) {
          setError("emailInscription", {
            type: "manual",
            message: errorData.message,
          });

          return;
        }

        throw new Error(
          errorData.message || "Une erreur est survenue lors de l'inscription.",
        );
      }

      const res = await signIn("credentials", {
        redirect: false,
        email: data.emailInscription,
        password: data.passwordInscription,
      });

      if (res?.error) {
        addToast({
          title: "Inscription réussie",
          description:
            "Cependant, un problème est survenu lors de la connexion automatique. Veuillez vous connecter manuellement.",
          color: "warning",
          timeout: 5000,
        });
        setAuthMode("login");

        return;
      }

      onClose();

      addToast({
        title: "Bienvenue sur CESIZEN !",
        description:
          "Votre compte a été créé et vous êtes maintenant connecté.",
        color: "success",
        timeout: 5000,
      });

      reset();
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      addToast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue.",
        color: "danger",
        timeout: 5000,
      });
    }
  };

  /**
   * Tente de connecter l'utilisateur en utilisant le provider "credentials" de Next-Auth.
   * @param {userConnexionData} data - Les données de connexion validées.
   */
  const handleLogin = async (data: userConnexionData) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.emailConnexion,
        password: data.passwordConnexion,
      });

      if (res?.error) {
        addToast({
          title: "Erreur",
          description: res.error,
          color: "danger",
          timeout: 5000,
        });

        return;
      }

      onClose();

      addToast({
        title: "Bon retour !",
        description: "Connexion réussie.",
        color: "success",
        timeout: 5000,
      });
      reset();
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  /**
   * Simule l'envoi d'un e-mail de réinitialisation de mot de passe.
   * @param {any} data - Les données contenant l'email de récupération.
   */
  const handleForgotPassword = (data: any) => {
    addToast({
      title: "Lien envoyé !",
      description:
        "Si cette adresse est associée à un compte, un e-mail de réinitialisation a été envoyé.",
      color: "success",
      timeout: 5000,
    });
    reset();
    setAuthMode("login");
  };

  return (
    <>
      <Button
        className="bg-purple-800 text-white font-semibold"
        onPress={handleOpen}
      >
        Se connecter
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="center"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-900 dark:text-gray-100">
                {authMode === "login" && "Se connecter"}
                {authMode === "register" && "Créer votre compte"}
                {authMode === "forgotPassword" && "Mot de passe oublié"}
              </ModalHeader>

              <form
                onSubmit={handleSubmit(async (data: any) => {
                  getData(data);
                  if (authMode === "register") {
                    await handleRegister(data);
                  } else if (authMode === "login") {
                    await handleLogin(data);
                  } else if (authMode === "forgotPassword") {
                    handleForgotPassword(data);
                  }
                })}
              >
                <ModalBody>
                  {authMode === "login" && (
                    <div className="flex flex-col gap-4">
                      <Input
                        label="Email"
                        placeholder="exemple@mail.com"
                        variant="bordered"
                        {...register("emailConnexion", {
                          required: "Veuillez entrer une adresse mail valide.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Veuillez entrer une adresse mail valide",
                          },
                        })}
                        errorMessage={errors.emailConnexion?.message as string}
                        isInvalid={!!errors.emailConnexion}
                      />
                      <Input
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeFilledIcon className="text-2xl text-default-400" />
                            ) : (
                              <EyeSlashFilledIcon className="text-2xl text-default-400" />
                            )}
                          </button>
                        }
                        label="Mot de passe"
                        placeholder="******"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        {...register("passwordConnexion", {
                          required: "Veuillez entrer votre mot de passe.",
                        })}
                        errorMessage={
                          errors.passwordConnexion?.message as string
                        }
                        isInvalid={!!errors.passwordConnexion}
                      />
                      <div className="flex justify-end">
                        <span
                          className="text-purple-700 dark:text-purple-400 cursor-pointer text-sm hover:underline"
                          onClick={() => {
                            reset();
                            setAuthMode("forgotPassword");
                          }}
                        >
                          Mot de passe oublié ?
                        </span>
                      </div>
                    </div>
                  )}

                  {authMode === "register" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Rejoignez CESIZEN et retrouvez votre équilibre
                        intérieur.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                          className="w-full"
                          label="Prénom"
                          placeholder="Jean"
                          variant="bordered"
                          {...register("firstName", {
                            required: "Veuillez entrer votre prénom.",
                          })}
                          errorMessage={errors.firstName?.message as string}
                          isInvalid={!!errors.firstName}
                        />
                        <Input
                          className="w-full"
                          label="Nom"
                          placeholder="Dupont"
                          variant="bordered"
                          {...register("lastName", {
                            required: "Veuillez entrer votre nom.",
                          })}
                          errorMessage={errors.lastName?.message as string}
                          isInvalid={!!errors.lastName}
                        />
                      </div>

                      <Input
                        label="Email"
                        placeholder="exemple@email.com"
                        variant="bordered"
                        {...register("emailInscription", {
                          required: "Veuillez entrer une adresse mail valide.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Veuillez entrer une adresse mail valide",
                          },
                        })}
                        errorMessage={
                          errors.emailInscription?.message as string
                        }
                        isInvalid={!!errors.emailInscription}
                      />
                      <Input
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeFilledIcon className="text-2xl text-default-400" />
                            ) : (
                              <EyeSlashFilledIcon className="text-2xl text-default-400" />
                            )}
                          </button>
                        }
                        label="Mot de passe"
                        placeholder="******"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        {...register("passwordInscription", {
                          required: "Veuillez entrer un mot de passe.",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.",
                          },
                        })}
                        errorMessage={
                          errors.passwordInscription?.message as string
                        }
                        isInvalid={!!errors.passwordInscription}
                      />
                      <Input
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibilitySecond}
                          >
                            {isVisibleSecond ? (
                              <EyeFilledIcon className="text-2xl text-default-400" />
                            ) : (
                              <EyeSlashFilledIcon className="text-2xl text-default-400" />
                            )}
                          </button>
                        }
                        label="Confirmer le mot de passe"
                        placeholder="******"
                        type={isVisibleSecond ? "text" : "password"}
                        variant="bordered"
                        {...register("confirmPasswordInscription", {
                          required: "Veuillez confirmer votre mot de passe.",
                          validate: (value) =>
                            value === watch("passwordInscription") ||
                            "Les mots de passe ne correspondent pas.",
                        })}
                        errorMessage={
                          errors.confirmPasswordInscription?.message as string
                        }
                        isInvalid={!!errors.confirmPasswordInscription}
                      />
                      <div className="flex flex-col gap-2">
                        <Checkbox
                          classNames={{
                            label: "text-tiny text-gray-500 dark:text-gray-400",
                          }}
                          color="default"
                          size="sm"
                          {...register("acceptedCGU", {
                            required:
                              "Veuillez accepter les Conditions Générales d'Utilisation.",
                          })}
                          isInvalid={!!errors.acceptedCGU}
                        >
                          J’accepte les{" "}
                          <Link
                            className="text-tiny text-blue-700 dark:text-blue-400 underline"
                            href="#"
                          >
                            Conditions Générales d’Utilisation
                          </Link>
                        </Checkbox>

                        <Checkbox
                          classNames={{
                            label: "text-tiny text-gray-500 dark:text-gray-400",
                          }}
                          color="default"
                          size="sm"
                          {...register("readPrivacy", {
                            required:
                              "Veuillez lire la Politique de confidentialité.",
                          })}
                          isInvalid={!!errors.readPrivacy}
                        >
                          J’ai lu la{" "}
                          <Link
                            className="text-tiny text-blue-700 dark:text-blue-400 underline"
                            href="#"
                          >
                            Politique de confidentialité
                          </Link>
                        </Checkbox>
                      </div>
                    </div>
                  )}

                  {authMode === "forgotPassword" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Entrez votre adresse e-mail. Si elle correspond à un
                        compte CESIZEN, nous vous enverrons un lien pour
                        réinitialiser votre mot de passe.
                      </p>
                      <Input
                        label="Email de récupération"
                        placeholder="exemple@mail.com"
                        variant="bordered"
                        {...register("emailForgot", {
                          required: "Veuillez entrer une adresse mail.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Adresse invalide",
                          },
                        })}
                        errorMessage={errors.emailForgot?.message as string}
                        isInvalid={!!errors.emailForgot}
                      />
                    </div>
                  )}
                </ModalBody>

                <ModalFooter className="flex flex-col gap-3">
                  <Button
                    className="bg-purple-800 hover:bg-purple-700 text-white w-full"
                    type="submit"
                  >
                    {authMode === "login" && "Se connecter"}
                    {authMode === "register" && "S'inscrire"}
                    {authMode === "forgotPassword" && "Envoyer le lien"}
                  </Button>

                  <div className="text-center w-full pb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {authMode === "login" && (
                        <>
                          Vous n'avez pas encore de compte ?{" "}
                          <span
                            className="text-purple-700 dark:text-purple-400 font-bold cursor-pointer hover:underline"
                            onClick={() => {
                              reset();
                              setAuthMode("register");
                            }}
                          >
                            S'inscrire
                          </span>
                        </>
                      )}
                      {authMode === "register" && (
                        <>
                          Vous avez déjà un compte ?{" "}
                          <span
                            className="text-purple-700 dark:text-purple-400 font-bold cursor-pointer hover:underline"
                            onClick={() => {
                              reset();
                              setAuthMode("login");
                            }}
                          >
                            Se connecter
                          </span>
                        </>
                      )}
                      {authMode === "forgotPassword" && (
                        <>
                          Vous vous souvenez de votre mot de passe ?{" "}
                          <span
                            className="text-purple-700 dark:text-purple-400 font-bold cursor-pointer hover:underline"
                            onClick={() => {
                              reset();
                              setAuthMode("login");
                            }}
                          >
                            Retour à la connexion
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

/* ========================================================================================
EXPLICATION DE LA LOGIQUE INTERNE AU RENDU (JSX)
========================================================================================

1. Logique d'affichage dynamique (Login vs Inscription vs Mot de passe oublié) :
   - L'état `authMode` a été étendu pour inclure "forgotPassword".
   - Le rendu conditionnel (`authMode === "..." && (...)`) remplace les ternaires pour plus de clarté entre les 3 vues.
   - Les titres (`ModalHeader`), les champs (`ModalBody`) et les boutons (`ModalFooter`) s'adaptent automatiquement selon la valeur de `authMode`.

2. Gestion du formulaire avec React-Hook-Form (`{...register(...)}`) :
   - Plutôt que d'utiliser de multiples états pour chaque champ (via useState), `react-hook-form` relie les `<Input>` à ses règles de validation grâce à la déstructuration du `register`.
   - Si un champ échoue à sa validation (ex: RegExp du mail, ou mot de passe trop simple), l'état `isInvalid={!!errors.champ}` bascule en `true`, et le composant affiche automatiquement `errorMessage`.
   - La balise `<form>` englobe le `ModalBody` et intercepte l'événement de validation globale via `onSubmit={handleSubmit(...)}`. Il achemine ensuite les données vers la fonction correspondante selon le mode.

3. Interactivité des mots de passe (Icônes Œil) :
   - Le champ "Mot de passe" possède un bouton en bout de ligne (`endContent`).
   - Au clic, il déclenche `toggleVisibility`, qui inverse l'état `isVisible`.
   - Le type de l'Input bascule dynamiquement entre `type="text"` (visible) et `type="password"` (masqué).
   - L'icône affichée s'adapte simultanément (`<EyeFilledIcon />` vs `<EyeSlashFilledIcon />`).

4. Changement de mode dans le `ModalFooter` et les liens :
   - Des textes cliquables permettent à l'utilisateur de naviguer entre les différents formulaires.
   - Un clic sur ces textes déclenche `setAuthMode(...)` et `reset()` (pour vider les éventuelles erreurs du formulaire précédent). Cela provoque un re-rendu immédiat de la modale avec les bons champs, sans rechargement de page.

========================================================================================
*/
