public static class DialogueKeys
{
    /// <summary>
    /// [DIALOG] DIALOG-001
    /// "hello this is a test"
    /// </summary>
    /// <remarks>Scene: New Scene</remarks>
    /// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiM0Q0FGNTAiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJM8L3RleHQ+PC9zdmc+" />
    public const string MAIN_ROOT_NEW_SCENE_DIALOG_001 = "main.root.New Scene.DIALOG-001";

    /// <summary>
    /// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNGNDQzMzYiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJY8L3RleHQ+PC9zdmc+" />
    /// </summary>
    public const string TEST_RED_CIRCLE = "test.red";

    // ----- PARA : paragraphes séparés -----

    /// <summary>
    /// <para>Premier paragraphe.</para>
    /// <para>Deuxième paragraphe séparé.</para>
    /// <para>Troisième paragraphe.</para>
    /// </summary>
    public const string TEST_PARA = "test.para";

    // ----- C : code inline -----

    /// <summary>
    /// Appelle <c>DialogueSystem.Play("key")</c> pour lancer le dialogue.
    /// </summary>
    public const string TEST_CODE_INLINE = "test.c";

    // ----- CODE : bloc de code -----

    /// <summary>
    /// Exemple de code :
    /// <code>
    /// var key = DialogueKeys.MAIN_ROOT_NEW_SCENE_DIALOG_001;
    /// var system = new DialogueSystem();
    /// system.Play(key);
    /// </code>
    /// </summary>
    public const string TEST_CODE_BLOCK = "test.code";

    // ----- EXAMPLE -----

    /// <summary>Constante avec exemple.</summary>
    /// <example>
    /// Usage :
    /// <code>
    /// var val = DialogueKeys.TEST_EXAMPLE;
    /// </code>
    /// </example>
    public const string TEST_EXAMPLE = "test.example";

    // ----- SEE CREF : lien vers type/membre -----

    /// <summary>
    /// Voir <see cref="DialogueKeys"/> et <see cref="MAIN_ROOT_NEW_SCENE_DIALOG_001"/>.
    /// </summary>
    public const string TEST_SEE_CREF = "test.see.cref";

    // ----- SEE HREF : lien externe -----

    /// <summary>
    /// Documentation : <see href="https://learn.microsoft.com/dotnet/csharp/language-reference/xmldoc/">XML doc reference</see>.
    /// </summary>
    public const string TEST_SEE_HREF = "test.see.href";

    // ----- SEEALSO -----

    /// <summary>Résumé.</summary>
    /// <seealso cref="DialogueKeys"/>
    /// <seealso href="https://github.com"/>
    public const string TEST_SEEALSO = "test.seealso";

    // ----- LIST BULLET -----

    /// <summary>
    /// Statuts possibles :
    /// <list type="bullet">
    ///   <item><description>Actif</description></item>
    ///   <item><description>Inactif</description></item>
    ///   <item><description>En attente</description></item>
    /// </list>
    /// </summary>
    public const string TEST_LIST_BULLET = "test.list.bullet";

    // ----- LIST NUMBER -----

    /// <summary>
    /// Étapes :
    /// <list type="number">
    ///   <item><description>Initialiser</description></item>
    ///   <item><description>Configurer</description></item>
    ///   <item><description>Exécuter</description></item>
    /// </list>
    /// </summary>
    public const string TEST_LIST_NUMBER = "test.list.number";

    // ----- LIST TABLE -----

    /// <summary>
    /// <list type="table">
    ///   <listheader>
    ///     <term>Couleur</term>
    ///     <description>Signification</description>
    ///   </listheader>
    ///   <item>
    ///     <term>Vert</term>
    ///     <description>Succès</description>
    ///   </item>
    ///   <item>
    ///     <term>Rouge</term>
    ///     <description>Erreur</description>
    ///   </item>
    /// </list>
    /// </summary>
    public const string TEST_LIST_TABLE = "test.list.table";

    // ----- REMARKS -----

    /// <summary>Résumé court.</summary>
    /// <remarks>
    /// Détails supplémentaires affichés après le summary.
    /// Peut contenir plusieurs lignes.
    /// </remarks>
    public const string TEST_REMARKS = "test.remarks";

    // ----- INHERITDOC -----

    /// <inheritdoc cref="MAIN_ROOT_NEW_SCENE_DIALOG_001"/>
    public const string TEST_INHERITDOC = "test.inheritdoc";

    // ----- PERMISSION -----

    /// <summary>Accès restreint.</summary>
    /// <permission cref="System.Security.PermissionSet">Requiert les droits admin.</permission>
    public const string TEST_PERMISSION = "test.permission";

    // ----- IMAGE dans summary -----

    /// <summary>
    /// Image inline dans le summary :
    /// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiMyMTk2RjMiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5pPC90ZXh0Pjwvc3ZnPg==" />
    /// Texte après l'image.
    /// </summary>
    public const string TEST_IMG_IN_SUMMARY = "test.img.summary";

    // ----- IMAGE dans remarks -----

    /// <summary>Image dans remarks.</summary>
    /// <remarks>
    /// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNGRkM1MDciLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7imqA8L3RleHQ+PC9zdmc+" />
    /// </remarks>
    public const string TEST_IMG_IN_REMARKS = "test.img.remarks";

    // ----- COMBO : tous les tags ensemble -----

    /// <summary>
    /// <para><c>STATUS: ACTIVE</c> — Dialogue actif.</para>
    /// <para>Voir <see cref="MAIN_ROOT_NEW_SCENE_DIALOG_001"/>.</para>
    /// </summary>
    /// <remarks>
    /// Options :
    /// <list type="bullet">
    ///   <item><description><c>start</c> — Démarre</description></item>
    ///   <item><description><c>stop</c> — Arrête</description></item>
    /// </list>
    /// </remarks>
    /// <example>
    /// <code>
    /// var key = DialogueKeys.TEST_COMBO;
    /// </code>
    /// </example>
    /// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiM5QzI3QjAiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7imIU8L3RleHQ+PC9zdmc+" />
    public const string TEST_COMBO = "test.combo";
}

// =============================================================================
// Interface + classe pour tester param, returns, exception, inheritdoc
// =============================================================================

/// <summary>
/// Interface de dialogue.
/// </summary>
/// <typeparam name="T">Type de réponse.</typeparam>
public interface IDialogue<T>
{
    /// <summary>
    /// Joue le dialogue <paramref name="key"/>.
    /// </summary>
    /// <param name="key">Clé du dialogue (voir <see cref="DialogueKeys"/>).</param>
    /// <returns>Réponse de type <typeparamref name="T"/>.</returns>
    /// <exception cref="System.Collections.Generic.KeyNotFoundException">Clé introuvable.</exception>
    T Play(string key);
}

/// <summary>Implémentation avec inheritdoc.</summary>
public class DialogueSystem : IDialogue<string>
{
    /// <inheritdoc/>
    public string Play(string key) => key;
}
