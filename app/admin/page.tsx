"use client";

import { useEffect, useState } from "react";
import { Trash2, Ban, CheckCircle, ShieldAlert, Users, FileText, Plus, X, Pencil, Eye, EyeOff, Wind } from "lucide-react";

interface User {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  actif: boolean;
  role: "ADMIN" | "USER";
}

interface Article {
  id_article: number;
  titre: string;
  resume: string | null;
  contenu: string;
  est_publie: boolean;
  date_creation: string;
}

interface Exercice {
  id_exercice: number;
  nom_exercice: string;
  temps_inspiration: number;
  temps_apnee: number;
  temps_expiration: number;
  description: string | null;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"users" | "articles" | "exercices">("users");

  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  const [articles, setArticles] = useState<Article[]>([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [newArticle, setNewArticle] = useState({ titre: "", resume: "", contenu: "", est_publie: false });
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [isExercicesLoading, setIsExercicesLoading] = useState(true);
  const [showAddExerciceForm, setShowAddExerciceForm] = useState(false);
  const [newExercice, setNewExercice] = useState({ nom_exercice: "", description: "", temps_inspiration: 4, temps_apnee: 4, temps_expiration: 4 });
  const [editingExercice, setEditingExercice] = useState<Exercice | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) setUsers(await response.json());
    } catch (error) { console.error(error); } finally { setIsUsersLoading(false); }
  };

  const toggleUserStatus = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setUsers(users.map(u => u.id_utilisateur === id ? { ...u, actif: newStatus } : u));
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actif: newStatus }),
      });
    } catch (error) { fetchUsers(); }
  };

  const deleteUser = async (id: number, nom: string) => {
    if (!window.confirm(`Supprimer définitivement ${nom} ?`)) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id_utilisateur !== id));
    } catch (error) { console.error(error); }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles');
      if (response.ok) setArticles(await response.json());
    } catch (error) { console.error(error); } finally { setIsArticlesLoading(false); }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      });
      if (response.ok) {
        const created = await response.json();
        setArticles([created, ...articles]);
        setShowAddArticleForm(false);
        setNewArticle({ titre: "", resume: "", contenu: "", est_publie: false });
      }
    } catch (error) { alert("Erreur lors de la création de l'article."); }
  };

  const toggleArticleStatus = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setArticles(articles.map(a => a.id_article === id ? { ...a, est_publie: newStatus } : a));
    try {
      await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ est_publie: newStatus }),
      });
    } catch (error) { fetchArticles(); }
  };

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    try {
      const response = await fetch(`/api/admin/articles/${editingArticle.id_article}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle),
      });
      if (response.ok) {
        const updated = await response.json();
        setArticles(articles.map(a => a.id_article === updated.id_article ? updated : a));
        setEditingArticle(null);
      }
    } catch (error) { alert("Erreur modification"); }
  };

  const deleteArticle = async (id: number, titre: string) => {
    if (!window.confirm(`Supprimer l'article "${titre}" ?`)) return;
    try {
      await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      setArticles(articles.filter(a => a.id_article !== id));
    } catch (error) { console.error(error); }
  };

  const fetchExercices = async () => {
    try {
      const response = await fetch('/api/exercices'); 
      if (response.ok) setExercices(await response.json());
    } catch (error) { console.error(error); } finally { setIsExercicesLoading(false); }
  };

  const handleCreateExercice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/exercices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExercice),
      });
      if (response.ok) {
        const created = await response.json();
        setExercices([created, ...exercices]);
        setShowAddExerciceForm(false);
        setNewExercice({ nom_exercice: "", description: "", temps_inspiration: 4, temps_apnee: 4, temps_expiration: 4 });
      }
    } catch (error) { alert("Erreur création exercice"); }
  };

  const handleUpdateExercice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExercice) return;
    try {
      const response = await fetch(`/api/admin/exercices/${editingExercice.id_exercice}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExercice),
      });
      if (response.ok) {
        const updated = await response.json();
        setExercices(exercices.map(ex => ex.id_exercice === updated.id_exercice ? updated : ex));
        setEditingExercice(null);
      }
    } catch (error) { alert("Erreur modification exercice"); }
  };

  const deleteExercice = async (id: number, nom: string) => {
    if (!window.confirm(`Supprimer l'exercice "${nom}" ?`)) return;
    try {
      await fetch(`/api/admin/exercices/${id}`, { method: 'DELETE' });
      setExercices(exercices.filter(ex => ex.id_exercice !== id));
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
    fetchExercices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 relative">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Administration
        </h1>
      </div>

      <div className="flex border-b border-gray-200 dark:border-zinc-800 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "users" ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <Users className="w-4 h-4" /> Utilisateurs
        </button>
        <button
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "articles" ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <FileText className="w-4 h-4" /> Articles
        </button>
        <button
          onClick={() => setActiveTab("exercices")}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "exercices" ? "border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          <Wind className="w-4 h-4" /> Exercices
        </button>
      </div>

      {activeTab === "users" && (
        <div className="w-full">
          <div className="md:hidden flex flex-col gap-4">
            {isUsersLoading ? (
              <div className="text-center text-gray-500 py-8 animate-pulse">Chargement...</div>
            ) : users.map((user) => (
              <div key={user.id_utilisateur} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 dark:text-white text-base">#{user.id_utilisateur} - {user.prenom} {user.nom}</span>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {user.role}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-md ${user.actif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {user.actif ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />} {user.actif ? "Actif" : "Désactivé"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => toggleUserStatus(user.id_utilisateur, user.actif)} className={`p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 ${user.actif ? "text-amber-600" : "text-emerald-600"}`}>
                      {user.actif ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </button>
                    <button onClick={() => deleteUser(user.id_utilisateur, user.nom)} className="p-2 text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">ID</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Nom & Prénom</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Email</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Rôle</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {users.map((user) => (
                  <tr key={user.id_utilisateur} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <td className="p-4 text-sm text-gray-500">#{user.id_utilisateur}</td>
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{user.prenom} {user.nom}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${user.actif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {user.actif ? <CheckCircle className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />} {user.actif ? "Actif" : "Désactivé"}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => toggleUserStatus(user.id_utilisateur, user.actif)} className={`p-2 rounded-lg ${user.actif ? "text-amber-600" : "text-emerald-600"}`}>
                        {user.actif ? <Ban className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                      </button>
                      <button onClick={() => deleteUser(user.id_utilisateur, user.nom)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "articles" && (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Liste des articles</h2>
            <button onClick={() => setShowAddArticleForm(!showAddArticleForm)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              {showAddArticleForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showAddArticleForm ? "Fermer" : "Nouvel Article"}
            </button>
          </div>

          {showAddArticleForm && (
            <form onSubmit={handleCreateArticle} className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 mb-8">
              <div className="grid gap-4 mb-4">
                <div><label className="block text-sm font-medium mb-1">Titre</label><input required type="text" value={newArticle.titre} onChange={e => setNewArticle({...newArticle, titre: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <div><label className="block text-sm font-medium mb-1">Résumé</label><input type="text" value={newArticle.resume} onChange={e => setNewArticle({...newArticle, resume: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <div><label className="block text-sm font-medium mb-1">Contenu complet</label><textarea required rows={5} value={newArticle.contenu} onChange={e => setNewArticle({...newArticle, contenu: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer"><input type="checkbox" checked={newArticle.est_publie} onChange={e => setNewArticle({...newArticle, est_publie: e.target.checked})} className="w-4 h-4" /><span className="text-sm">Publier immédiatement</span></label>
              </div>
              <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg">Créer l'article</button>
            </form>
          )}

          <div className="md:hidden flex flex-col gap-4">
            {articles.map((article) => (
              <div key={article.id_article} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-gray-900 dark:text-white text-base line-clamp-2">{article.titre}</span>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-md whitespace-nowrap ${article.est_publie ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                    {article.est_publie ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{new Date(article.date_creation).toLocaleDateString('fr-FR')}</div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <button onClick={() => toggleArticleStatus(article.id_article, article.est_publie)} className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800">
                    {article.est_publie ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button onClick={() => setEditingArticle(article)} className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteArticle(article.id_article, article.titre)} className="p-2 text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">ID</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Titre</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {articles.map((article) => (
                  <tr key={article.id_article} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <td className="p-4 text-sm text-gray-500">#{article.id_article}</td>
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{article.titre}</td>
                    <td className="p-4 text-sm text-gray-600">{new Date(article.date_creation).toLocaleDateString('fr-FR')}</td>
                    <td className="p-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${article.est_publie ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                        {article.est_publie ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => toggleArticleStatus(article.id_article, article.est_publie)} className="p-2 rounded-lg">
                        {article.est_publie ? <EyeOff className="w-5 h-5 text-amber-600" /> : <Eye className="w-5 h-5 text-emerald-600" />}
                      </button>
                      <button onClick={() => setEditingArticle(article)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteArticle(article.id_article, article.titre)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "exercices" && (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Liste des exercices</h2>
            <button onClick={() => setShowAddExerciceForm(!showAddExerciceForm)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors">
              {showAddExerciceForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showAddExerciceForm ? "Fermer" : "Nouvel Exercice"}
            </button>
          </div>

          {showAddExerciceForm && (
            <form onSubmit={handleCreateExercice} className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 mb-8">
              <div className="grid gap-4 mb-6">
                <div><label className="block text-sm font-medium mb-1">Nom</label><input required type="text" value={newExercice.nom_exercice} onChange={e => setNewExercice({...newExercice, nom_exercice: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-sky-600 mb-1">Insp. (s)</label><input required type="number" min="0" value={newExercice.temps_inspiration} onChange={e => setNewExercice({...newExercice, temps_inspiration: Number(e.target.value)})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                  <div><label className="block text-sm font-medium text-purple-600 mb-1">Apnée (s)</label><input required type="number" min="0" value={newExercice.temps_apnee} onChange={e => setNewExercice({...newExercice, temps_apnee: Number(e.target.value)})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                  <div><label className="block text-sm font-medium text-teal-600 mb-1">Exp. (s)</label><input required type="number" min="0" value={newExercice.temps_expiration} onChange={e => setNewExercice({...newExercice, temps_expiration: Number(e.target.value)})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Description</label><textarea rows={3} value={newExercice.description} onChange={e => setNewExercice({...newExercice, description: e.target.value})} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
              </div>
              <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg">Créer l'exercice</button>
            </form>
          )}

          <div className="md:hidden flex flex-col gap-4">
            {exercices.map((exo) => (
              <div key={exo.id_exercice} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
                <span className="font-bold text-gray-900 dark:text-white text-base">#{exo.id_exercice} - {exo.nom_exercice}</span>
                <div className="flex gap-2 text-sm font-semibold bg-gray-50 dark:bg-zinc-800 p-2 rounded-lg justify-center">
                  <span className="text-sky-500">{exo.temps_inspiration}s</span> - 
                  <span className="text-purple-500">{exo.temps_apnee}s</span> - 
                  <span className="text-teal-500">{exo.temps_expiration}s</span>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <button onClick={() => setEditingExercice(exo)} className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteExercice(exo.id_exercice, exo.nom_exercice)} className="p-2 text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">ID</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Nom</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Cycle (Insp-Apn-Exp)</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {exercices.map((exo) => (
                  <tr key={exo.id_exercice} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <td className="p-4 text-sm text-gray-500">#{exo.id_exercice}</td>
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{exo.nom_exercice}</td>
                    <td className="p-4 text-sm">
                      <div className="flex gap-2 font-semibold">
                        <span className="text-sky-500">{exo.temps_inspiration}s</span> - 
                        <span className="text-purple-500">{exo.temps_apnee}s</span> - 
                        <span className="text-teal-500">{exo.temps_expiration}s</span>
                      </div>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button onClick={() => setEditingExercice(exo)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteExercice(exo.id_exercice, exo.nom_exercice)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingArticle && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90dvh]">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Modifier l'article</h2>
              <button onClick={() => setEditingArticle(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button>
            </div>
            <form onSubmit={handleUpdateArticle} className="p-4 sm:p-6 overflow-y-auto flex-grow">
              <div className="grid gap-4 sm:gap-5 mb-6">
                <div><label className="block text-sm font-medium mb-1">Titre</label><input required type="text" value={editingArticle.titre} onChange={e => setEditingArticle({...editingArticle, titre: e.target.value})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <div><label className="block text-sm font-medium mb-1">Résumé</label><input type="text" value={editingArticle.resume || ""} onChange={e => setEditingArticle({...editingArticle, resume: e.target.value})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <div><label className="block text-sm font-medium mb-1">Contenu</label><textarea required rows={6} value={editingArticle.contenu} onChange={e => setEditingArticle({...editingArticle, contenu: e.target.value})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 resize-y" /></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <button type="button" onClick={() => setEditingArticle(null)} className="w-full sm:w-auto px-6 py-2.5 font-medium bg-gray-100 rounded-lg">Annuler</button>
                <button type="submit" className="w-full sm:w-auto px-6 py-2.5 font-medium text-white bg-blue-600 rounded-lg">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingExercice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90dvh]">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Modifier l'exercice</h2>
              <button onClick={() => setEditingExercice(null)} className="text-gray-400"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button>
            </div>
            <form onSubmit={handleUpdateExercice} className="p-4 sm:p-6 overflow-y-auto flex-grow">
              <div className="grid gap-4 sm:gap-5 mb-6">
                <div><label className="block text-sm font-medium mb-1">Nom</label><input required type="text" value={editingExercice.nom_exercice} onChange={e => setEditingExercice({...editingExercice, nom_exercice: e.target.value})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-sky-600 mb-1">Insp. (s)</label><input required type="number" min="0" value={editingExercice.temps_inspiration} onChange={e => setEditingExercice({...editingExercice, temps_inspiration: Number(e.target.value)})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                  <div><label className="block text-sm font-medium text-purple-600 mb-1">Apnée (s)</label><input required type="number" min="0" value={editingExercice.temps_apnee} onChange={e => setEditingExercice({...editingExercice, temps_apnee: Number(e.target.value)})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                  <div><label className="block text-sm font-medium text-teal-600 mb-1">Exp. (s)</label><input required type="number" min="0" value={editingExercice.temps_expiration} onChange={e => setEditingExercice({...editingExercice, temps_expiration: Number(e.target.value)})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Description</label><textarea rows={3} value={editingExercice.description || ""} onChange={e => setEditingExercice({...editingExercice, description: e.target.value})} className="w-full p-2.5 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 resize-y" /></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <button type="button" onClick={() => setEditingExercice(null)} className="w-full sm:w-auto px-6 py-2.5 font-medium bg-gray-100 rounded-lg">Annuler</button>
                <button type="submit" className="w-full sm:w-auto px-6 py-2.5 font-medium text-white bg-sky-600 rounded-lg">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

/**
 * ==============================================================================
 * DOCUMENTATION : AdminDashboardPage
 * ==============================================================================
 * 
 * 📌 VUE D'ENSEMBLE
 * Ce composant gère l'interface d'administration du site. Il permet de superviser
 * trois piliers de l'application : les utilisateurs, les articles du blog et 
 * les exercices de respiration.
 * 
 * 🏗️ STRUCTURE DES DONNÉES (Interfaces)
 * - User : Gère les accès (ADMIN/USER) et l'état de bannissement (actif).
 * - Article : Contenu éditorial avec gestion de l'état de publication.
 * - Exercice : Configuration des cycles de respiration (Inspiration, Apnée, Expiration).
 * 
 * 🛠️ FONCTIONNALITÉS CLÉS
 * 
 * 1. Gestion des Utilisateurs (Onglet "Utilisateurs")
 *    - Affichage de la liste complète via GET /api/admin/users.
 *    - Toggle d'activité : Active ou désactive un compte (PATCH).
 *    - Suppression : Retrait définitif de la base de données (DELETE).
 * 
 * 2. Gestion du Blog (Onglet "Articles")
 *    - Création : Formulaire intégré pour ajouter un titre, un résumé et un contenu (POST).
 *    - Édition : Modale dédiée pour modifier les textes existants (PATCH).
 *    - Visibilité : Toggle rapide pour publier ou passer en brouillon (PATCH).
 *    - Suppression : Suppression de l'article (DELETE).
 * 
 * 3. Gestion des Exercices (Onglet "Exercices")
 *    - Création : Paramétrage précis des durées de cycle en secondes (POST).
 *    - Édition : Ajustement des temps ou de la description via modale (PATCH).
 *    - Suppression : Retrait de l'exercice (DELETE).
 * 
 * 📱 DESIGN & RESPONSIVITÉ
 * - Mode Mobile (< 768px) : Les données s'affichent sous forme de cartes 
 *   verticales pour une meilleure lisibilité tactile.
 * - Mode Desktop (>= 768px) : Affichage sous forme de tableaux structurés 
 *   pour une vision dense et professionnelle.
 * - Mode Sombre : Support complet des classes `dark:` de Tailwind CSS.
 * 
 * 💡 UX (Expérience Utilisateur)
 * - Confirmations : Les suppressions critiques demandent une validation via window.confirm.
 * - Feedback Visuel : Utilisation d'états de chargement (skeletons/pulse) et 
 *   de couleurs sémantiques (Vert=Succès, Rouge=Danger, Bleu=Info).
 * - Modales : Conçues avec `max-h-[90dvh]` pour rester utilisables même sur 
 *   petits écrans avec un défilement interne.
 * ==============================================================================
 */