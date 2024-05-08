-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 08 mai 2024 à 10:10
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `technoshop`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `prix` int(11) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `description` varchar(50) NOT NULL,
  `vendeurId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `libelle`, `categoryId`, `prix`, `photo`, `description`, `vendeurId`) VALUES
(8, 'airpods', 3, 150, 'airpods.jpg', 'airpods blanc', 1),
(9, 'Iphone', 2, 1500, 'ipho1.jpg', 'Iphone rouge', 1),
(10, 'smartwatch', 3, 500, 'smartwatch.jpg', 'smartwatch bleu', 1),
(11, 'iPhone 12 64Go', 2, 2799, 'iphone12.jpg', 'iphone bleu', 19),
(12, 'iPhone 15 128Go', 2, 4399, 'iphone128rose.jpg', 'iphone rose', 19),
(13, 'Airpods PRO NOIR', 3, 250, 'airpodspro.png', 'airpods noir', 19);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `libelle`) VALUES
(1, 'ordinateur'),
(2, 'telephone'),
(3, 'accessoire');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `montant` int(11) NOT NULL,
  `adresse_livraison` varchar(50) NOT NULL,
  `clientId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `date`, `montant`, `adresse_livraison`, `clientId`) VALUES
(1, '2024-04-06', 1650, 'ouerdia', 11),
(2, '2024-04-17', 1500, 'ouerdia', 29);

-- --------------------------------------------------------

--
-- Structure de la table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `rate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rating`
--

INSERT INTO `rating` (`id`, `id_article`, `rate`) VALUES
(1, 8, 3),
(2, 8, 3),
(3, 8, 4),
(4, 9, 4),
(5, 9, 2),
(6, 10, 5),
(7, 11, 4),
(8, 11, 1),
(9, 13, 4),
(10, 13, 2),
(11, 13, 5),
(12, 13, 3),
(13, 13, 4),
(14, 13, 5),
(15, 11, 4);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom_utilisateur` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(100) NOT NULL,
  `telephone` int(8) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom_utilisateur`, `email`, `mot_de_passe`, `telephone`, `adresse`, `photo`, `role`) VALUES
(1, 'Karim ben amor', 'karim@gmail.com', '$2a$12$dQPQ0LuiFDQpIqbTPmf1b.BMvlkd8J6ESzIUAtdfEYIvPPqhGzji6', 25896314, 'tunis', 'person1.jpg', 'vendeur'),
(11, 'mahmoud', 'mahmoud@gmail.com', '$2a$12$VZAFRGGEmjD24BMLp16buupZsQpbJo4dVadcBzMGRE5QckByB88su', 14785237, 'ouerdia', 'person3.jpg', 'client'),
(12, 'mariem_khra', 'mariem@gmail.com', 'mariem123', 14785236, 'ben yaghlene', 'grgr', 'client'),
(14, 'ffff', 'ffff', '1ffff', 36514, 'zefez', 'zefze', 'client'),
(17, 'testimg', 'tets@gmail.com', 'testtest', 36985214, 'new york', 'user.jpg', 'client'),
(19, 'Salim ben amor', 'salim@ensit.tn', '$2a$12$T1AA0ooTLTbveGwmc33bVOt/UlSByKxaxu/EuS7CtSnKI/aH9jDFa', 36985214, 'Sousse', 'user_modi.jpg', 'vendeur'),
(21, 'vvvvvv', 'test@ensit.com', 'mahmoud3698', 36985214, 'ouerdia', 'cccc.png', 'client'),
(22, 'Ahmed sidi ali', 'sidiali@gmail.com', '147852369', 36985214, 'tunis', 'person2.jpg', 'vendeur'),
(26, 'admin_admin', 'admin@gmail.com', '$2a$12$aekXTQkbgaWx41cuDjODZ.2CKM7W4b7RloT3KIHx/v9DHI1zZUNwW', 55336656, 'Tunis', 'person6.jpg', 'admin'),
(28, 'test', 'test@gmail.com', '$2b$12$dtWfydtdeQNRzFOgfc4kheSZRWqjDdbRxht/Hh8QhqM', 14785236, 'test', 'cccc.png', 'client'),
(29, 'mahmoud525', 'mahmoud@ensit.tn', '$2b$12$nrfM1vJPRgfoSdW4Rs3QR.ynjWCG8OWRJ/PgUetMi7fu3l6hhsVw2', 52717930, 'ouerdia', 'person10.jpg', 'client');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `vendeurId` (`vendeurId`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Index pour la table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_article` (`id_article`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`vendeurId`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
