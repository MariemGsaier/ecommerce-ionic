from flask import Flask
from flask import request, jsonify
from flask import sessions
from flask import make_response
from flask_cors import CORS

import base64
import jwt
import MySQLdb

import bcrypt

from werkzeug.utils import secure_filename
import os
import urllib.request




app = Flask(__name__)
CORS(app)

app.secret_key = "caircocoders-ednalan"



UPLOAD_FOLDER = '../frontend/src/assets/images/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
  
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
  
def allowed_file(filename):
 return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




# MySQL Connection Parameters
host = 'localhost'
user = 'root'
password = ''
database = 'technoshop'

try:
    #Connexion MYSQL
    mysql = MySQLdb.connect(host=host, user=user, password=password, database=database)
    print("Database connection successful")
    print(mysql)
   
except Exception as e:
    print("Database connection failed:", e)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/test_db_connection')
def test_db_connection():
    try:
        cursor = mysql.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        cursor.close()
        if result:
            return jsonify({'message': 'Database connection successful'})
        else:
            return jsonify({'message': 'Database connection failed'}), 500
    except Exception as e:
        return jsonify({'message': 'An error occurred while testing database connection', 'error': str(e)}), 500

#login (client + vendeur)
@app.route('/api/login', methods=['POST'])
def login():
    # Récupérer les données de la requête
    email = request.json.get('email')
    password = request.json.get('password')
    # Vérifier l'existence de l'utilisateur dans la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        # Vérifier le mot de passe
        print(user)
        print('mdp'+user[3])
        hashed_password = user[3]  
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            #si mdp correcte génération du token
            user_id = user[0]
            payload = {'email': email, 'user_id': user_id}
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            response = make_response(jsonify({'token': token, 'user_id': user_id}))
            return response
        else:
            #mdp incorrecte
            return jsonify({'message': 'Email ou mot de passe incorrect'}), 401
    else:
        #utilisateur inexistant dans BD
        return jsonify({'message': 'Email ou mot de passe incorrect'}), 401




#signup (client)
@app.route('/api/signup', methods=['POST'])
def signup():
    
    # Récupération des données du formulaire
    username = request.form.get('username')
    email = request.form.get('email')
    raw_password = request.form.get('password')
    telephone = request.form.get('telephone')
    adresse = request.form.get('adresse')
    files = request.files.getlist('files[]')

    password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())
    # Insértion des données dans BD
    cursor = mysql.cursor()
    insert_query = "INSERT INTO utilisateur (nom_utilisateur, email, mot_de_passe, telephone, adresse, photo, role) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    for file in files:
        filename = secure_filename(file.filename)
        if file and allowed_file(filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            cursor.execute(insert_query, (username, email, password, telephone,adresse, filename,"client"))
            mysql.commit()
    
    
    cursor.close()
    return jsonify({'message': 'Inscription réussie'})

#informations profil utilisateur
@app.route('/api/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    # Vérifier l'existence de l'utilisateur dans la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
        #print(user)
        return jsonify(user)
    else:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404       

# Modifier le profil (client + vendeur)
@app.route('/api/profile/update/<int:user_id>', methods=['POST'])
def update_profile(user_id):
    # Récupérer les données de la requête
    new_username = request.json.get('new_username')
    new_phone = request.json.get('new_phone')
    new_address = request.json.get('new_adresse')
    new_email = request.json.get('new_email');

    # Vérifier l'existence de l'utilisateur dans la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
        # Mise à jour es informations du profil utilisateur 
        update_query = "UPDATE utilisateur SET nom_utilisateur = %s, telephone = %s, adresse = %s, email= %s WHERE id = %s"
        cursor.execute(update_query, (new_username, new_phone, new_address, new_email, user_id))
        mysql.commit()

        return jsonify({'message': 'Profil mis à jour avec succès'})
    else:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404
    
#modifier mot de passe
@app.route('/api/profile/update_password/<int:user_id>', methods=['POST'])
def update_password(user_id):
    # Récupérer les données de la requête
    old_password = request.json.get('old_password')
    new_password = request.json.get('new_password')
    #Vérifier l'existence de l'utilisateur dans la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s AND mot_de_passe = %s", (user_id, old_password))
    user = cursor.fetchone()
    if user:
        #Màj de l'utilisateur
        update_query = "UPDATE utilisateur SET mot_de_passe = %s WHERE id = %s"
        cursor.execute(update_query, (new_password, user_id))
        mysql.commit()

        return jsonify({'message': 'Mot de passe mis à jour avec succès'})
    else:
        return jsonify({'message': 'Utilisateur non trouvé ou mot de passe incorrect'}), 404

#ajout d'un vendeur (admin)
@app.route('/api/admin/add_seller', methods=['POST'])
def add_seller():
   
    # Récupération des données du nouveau vendeur 
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    telephone = request.form.get('telephone')
    adresse = request.form.get('adresse')
    files = request.files.getlist('files[]')

    cursor = mysql.cursor()
    insert_query = "INSERT INTO utilisateur (nom_utilisateur, email, mot_de_passe, telephone, adresse, photo,role) VALUES (%s, %s, %s, %s, %s, %s,%s)"
    
    for file in files:
        filename = secure_filename(file.filename)
        if file and allowed_file(filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            cursor.execute(insert_query, (username, email, password, telephone, adresse,filename,"vendeur"))
            mysql.commit()

    cursor.close()
    return jsonify({'message': 'Vendeur ajouté avec succès'})
 
#modification d'un vendeur (admin)
@app.route('/api/admin/update_seller/<int:seller_id>', methods=['POST'])
def update_seller(seller_id):
    
    # Récupération des nouvelles données du vendeur 
    new_username = request.json.get('username')
    new_email = request.json.get('email')
    new_password = request.json.get('password')
    new_telephone = request.json.get('telephone')
    new_address = request.json.get('adresse')

    # Vérifier l'existence du vendeur dans la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s", (seller_id,))
    seller = cursor.fetchone()

    if seller:
        # Màj des informations du vendeur 
        update_query = "UPDATE utilisateur SET nom_utilisateur = %s, email = %s, mot_de_passe = %s, telephone = %s, adresse = %s WHERE id = %s"
        cursor.execute(update_query, (new_username, new_email, new_password, new_telephone, new_address, seller_id))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Informations du vendeur mises à jour avec succès'})
    else:
        return jsonify({'message': 'Vendeur non trouvé'}), 404

#suppression d'un vendeur (admin)
@app.route('/api/admin/delete_seller/<int:seller_id>', methods=['DELETE'])
def delete_seller(seller_id):
    # Vérifier l'existence de l'utilisateur dans la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s", (seller_id,))
    seller = cursor.fetchone()

    if seller:
        # Supprimer le vendeur de la BD
        delete_query = "DELETE FROM utilisateur WHERE id = %s"
        cursor.execute(delete_query, (seller_id,))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Vendeur supprimé avec succès'})
    else:
        return jsonify({'message': 'Vendeur non trouvé'}), 404


#liste des vendeurs (admin)
@app.route('/api/sellers', methods=['GET'])
def get_sellers():
    # Récupérer tous les vendeurs de la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE role = 'vendeur'")
    sellers = cursor.fetchall()
    cursor.close()

    # Vérification de l'existence de vendeurs
    if sellers:
        sellers_json = []
        for seller in sellers:
            seller_data = {
                'id': seller[0],
                'nom_utilisateur': seller[1],
                'email': seller[2],
                'telephone': seller[4],
                'adresse': seller[5],
                'photo': seller[6] 
            }
            sellers_json.append(seller_data)
        return jsonify({'sellers': sellers_json})
    else:
        return jsonify({'message': 'Aucun vendeur trouvé'}), 404
#user par id
@app.route('/api/userById/<int:user_id>', methods=['GET'])
def get_user(user_id):
   
     # Récupérer des données 
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
        
        return jsonify(user)
    else:
        return jsonify({'message': 'utilisateur non trouvé'}), 404
#ajout d'un article (vendeur)
@app.route('/api/seller/add_product', methods=['POST'])
def add_product():
    #Récupération des données du nouveau produit
    libelle = request.form.get('libelle')
    category_id = request.form.get('categoryId')
    prix = request.form.get('prix')
    files = request.files.getlist('files[]')
    description = request.form.get('description')
    vendeur_id = request.form.get('vendeurId')


    cursor = mysql.cursor()
    insert_query = "INSERT INTO article (libelle, categoryId, prix, photo, description, vendeurId) VALUES (%s, %s, %s, %s, %s, %s)"
    print(files)

    for file in files:
        filename = secure_filename(file.filename)
        if file and allowed_file(filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            cursor.execute(insert_query, (libelle, category_id, prix, filename, description,vendeur_id))
            mysql.commit()
    
    cursor.close()
    return jsonify({'message': 'Produit ajouté avec succès'})

#liste des articles par catégorie (client)
@app.route('/api/category/<int:category_id>/articles', methods=['GET'])
def get_products_by_category(category_id):
    # Récupération de tous les articles ayant une catégorie spécifique
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM `article` WHERE categoryId = %s', (category_id,))
    products = cursor.fetchall()
    cursor.close()
   # Vérifier si des articles ont été trouvés
    if products:
        products_json = []
        for product in products:
            product_data = {
                'id': product[0],
                'libelle': product[1],
                'categoryId': product[2],
                'prix': product[3],
                'photo': product[4],  
                'description': product[5],
                'vendeurId': product[6]
            }
            products_json.append(product_data)

        return jsonify({'articles': products_json})
    else:
        #Message en cas d'erreur
        return jsonify({'message': 'Aucun article trouvé'}), 404

#liste des articles (client)
@app.route("/api/articles", methods=['GET'])
def get_all_products():
    # Récupération de tous les articles de la BD
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM article")
    products = cursor.fetchall()
    cursor.close()

    # Vérifier si des articles ont été trouvés
    if products:
        products_json = []
        for product in products:
            product_data = {
                'id': product[0],
                'libelle': product[1],
                'categoryId': product[2],
                'prix': product[3],
                'photo': product[4],  
                'description': product[5],
                'vendeurId': product[6]
            }
            products_json.append(product_data)
        return jsonify({'articles': products_json})
    else:
        return jsonify({'message': 'Aucun article trouvé'}), 404

#liste des articles (relatifs aux vendeur)

@app.route('/api/seller/<int:seller_id>/articles', methods=['GET'])
def get_seller_articles(seller_id):
    # Récupération de tous les articles du vendeur
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM article WHERE vendeurId = %s", (seller_id,))
    articles = cursor.fetchall()
    cursor.close()

    # Vérification de l'existence des articles du vendeur
    if articles:
        articles_json = []
        for article in articles:
            article_data = {
                'id': article[0],
                'libelle': article[1],
                'categoryId': article[2],
                'prix': article[3],
                'photo': article[4], 
                'description': article[5],
                'vendeurId': article[6]
            }
            articles_json.append(article_data)

        return jsonify({'articles': articles_json})
    else:
        return jsonify({'message': 'Aucun article trouvé pour ce vendeur'}), 404

#modification d'un article (vendeur)
@app.route('/api/seller/update_product/<int:article_id>', methods=['PUT'])
def update_product(article_id):
    # Récupération des nouvelles données de l'article 
    new_data = request.json
    new_libelle = new_data.get('libelle')
    new_category_id = new_data.get('categoryId')
    new_prix = new_data.get('prix')
    new_description = new_data.get('description')

    # Màj de l'article spécifié 
    cursor = mysql.cursor()
    update_query = "UPDATE article SET libelle = %s, categoryId = %s, prix = %s, description = %s WHERE id = %s"
    cursor.execute(update_query, (new_libelle, new_category_id, new_prix, new_description, article_id))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Article mis à jour avec succès'})

#supprimer un article (vendeur)
@app.route('/api/seller/delete_product/<int:article_id>', methods=['DELETE'])
def delete_product(article_id):
    # Supprimer l'article spécifié avec son id
    cursor = mysql.cursor()
    delete_query = "DELETE FROM article WHERE id = %s"
    cursor.execute(delete_query, (article_id,))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Article supprimé avec succès'})

#article par id
@app.route('/api/info_article/<int:article_id>', methods=['GET'])
def get_article(article_id):
    # Récupération des données à partir de la requête
    # Vérifier de l'existence de l'article
    cursor = mysql.cursor()
    cursor.execute("SELECT * FROM article WHERE id = %s", (article_id,))
    product = cursor.fetchone()

    if product:
        
        return jsonify(product)
    else:
        return jsonify({'message': 'Article non trouvé'}), 404


#Rating
@app.route('/api/rate_article', methods=['POST'])
def rate_article():
    data = request.json
    article_id = data.get('article_id')
    rate = data.get('rate')
    
    cursor = mysql.cursor()
    insert_query = "INSERT INTO rating (id_article, rate) VALUES (%s, %s)"
    cursor.execute(insert_query, (article_id, rate))
    mysql.commit()
    cursor.close()
    
    return jsonify({'message': 'Évaluation enregistrée'})  

#Rating de chaque article    
@app.route('/api/article/rating/<int:article_id>', methods=['GET'])
def get_article_rating(article_id):
    cursor = mysql.cursor()
    cursor.execute("SELECT AVG(rate) FROM rating WHERE id_article = %s", (article_id,))
    rating = cursor.fetchone()[0]

    if rating:
        return jsonify({'average_rating': rating})
    else:
        return jsonify({'average_rating': 0})


#passer une commande (client)
@app.route('/api/addOrder', methods=['POST'])
def save_order():
    # Récupération des  données de la commande 
    order_data = request.json
    date = order_data.get('date')
    montant = order_data.get('montant')
    adresse_livraison = order_data.get('adresse_livraison')
    client_id = order_data.get('clientId')

    # Insértion des infos de la commande dans la BD
    cursor = mysql.cursor()
    insert_query = "INSERT INTO commande (date, montant, adresse_livraison, clientId) VALUES (%s, %s, %s, %s)"
    cursor.execute(insert_query, (date, montant, adresse_livraison, client_id))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Commande passée avec succès'})

@app.route('/api/logout', methods=['GET'])
def logout():
    # Vérification si l'utilisateur est connecté en vérifiant la présence du token JWT 
    if 'jwt_token' in request.cookies:
        # suppression du jeton jwt
        response = make_response(jsonify({'message': 'Déconnexion réussie'}))
        response.set_cookie('jwt_token', '', max_age=0)
        # Effacer toutes les données de la session 
        session.clear()
        return response
    else:
        # Msg d'erreur en cas d'inexistence du token
        return jsonify({'error': 'Utilisateur non connecté'}), 401

#modification image article
@app.route('/api/seller/update_product_photo/<int:article_id>', methods=['PUT'])
def update_product_photo(article_id):
    files = request.files.getlist('files[]')
    
    cursor = mysql.cursor()
    update_query = "UPDATE article SET photo = %s WHERE id = %s"
    print(files)

    for file in files:
        filename = secure_filename(file.filename)
        if file and allowed_file(filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            cursor.execute(update_query, (filename,article_id))
            mysql.commit()

    cursor.close()

    return jsonify({'message': 'La photo de l\'article mis à jour avec succès'})


#modification image utilisateur
@app.route('/api/update_user_photo/<int:user_id>', methods=['PUT'])
def update_user_photo(user_id):
    
    
    files = request.files.getlist('files[]')
    
    cursor = mysql.cursor()
    update_query = "UPDATE utilisateur SET photo = %s WHERE id = %s"
    print(files)

    for file in files:
        filename = secure_filename(file.filename)
        if file and allowed_file(filename):
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            cursor.execute(update_query, (filename,user_id))
            mysql.commit()

    cursor.close()

    return jsonify({'message': 'Photo mis à jour avec succès'})

if __name__ == '__main__':
    app.run(host="172.16.10.43")