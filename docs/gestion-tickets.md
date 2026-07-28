# Gestion des anomalies et évolutions

## Cycle de traitement

1. Création du ticket.
2. Qualification de la demande.
3. Définition du type et de la priorité.
4. Affectation à un responsable.
5. Passage au statut « À faire ».
6. Création d’une branche Git liée au ticket.
7. Correction ou développement.
8. Réalisation des tests.
9. Création d’une Pull Request.
10. Validation dans l’environnement de recette.
11. Fusion et déploiement.
12. Clôture du ticket.

## Priorités

- P1 — Critique : application indisponible, fuite de données ou blocage général.
- P2 — Majeure : fonctionnalité importante inutilisable ou risque de sécurité important.
- P3 — Normale : anomalie avec solution de contournement ou évolution standard.
- P4 — Faible : amélioration mineure, ergonomique ou documentaire.

## Conditions de clôture

Un ticket est clôturé lorsque :

- la modification est terminée ;
- les tests sont réussis ;
- la Pull Request est fusionnée ;
- le résultat est validé ;
- la documentation est mise à jour si nécessaire.