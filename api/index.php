	<?php
require 'Slim/Slim.php';
require  'medoo.php';
require  'underscore.php';
\Slim\Slim::registerAutoloader();

// ----- AUTH ----- //

use \Slim\Middleware\HttpBasicAuthentication\AuthenticatorInterface;

class UserAuthenticator implements AuthenticatorInterface {
    public function authenticate($user, $pass) {
        $database = new medoo();
        $where["AND"] = array("username" => $user, "password" => md5($pass) );
        $r = $database->get("users", "*", $where);
        return $r;
    }
}

$app = new \Slim\Slim();

// ----- MIDDLE ----- //

$app->add(new \SlimJson\Middleware(array(
  'json.status' => true,
  'json.override_error' => true,
  'json.override_notfound' => true
)));

$app->add(new \Slim\Middleware\HttpBasicAuthentication(array(
    "path" => "/admin",
    "realm" => "Protected",
    "authenticator" => new UserAuthenticator()
)));

// ----- ROUTES ----- //
// BLOG -------------------------------------------------
$app->get('/blog/:table', function ($table) use ($app) {
	$database = new medoo();
	$params = $app->request->get();
	$where = array();
	$response = array();
	if(isset($params["limit"])) {
		$where["LIMIT"] = array($params["offset"], $params["limit"] );
	}
	if(isset($params["count"])) {
		$count = $database->count($table);
		$response["count"] = $count;
	}
	if(isset($params["order"])) {
		$where["ORDER"] = $params["order"] . " DESC";
	}
    $result = $database->select($table, "*", $where);
    $response["items"] = $result;
    $app->render(200, $response);
});
$app->get('/blog/:table/:field/:search', function ($table, $field, $search) use ($app) {
	$database = new medoo();
	$params = $app->request->get();
	$where = array();
	$response = array();
	$q = array($field => $search );
	if(isset($params["like"])) {
		$where["LIKE"] = $q;
	} else {
		$where["AND"] = $q;
	}
	if(isset($params["limit"])) {
		$where["LIMIT"] = array($params["offset"], $params["limit"] );
	}
	if(isset($params["count"])) {
		$count = $database->count($table, $q);
		$response["count"] = $count;
	}
    $result = $database->select($table, "*", $where);
    $response["items"] = $result;
    $app->render(200, $response);
});
$app->get('/blog/meta/:table/:field/:search', function ($table, $field, $search) use ($app) {
	$database = new medoo();
	$params = $app->request->get();
	$where = array();
	$response = array();
	$where["AND"] = array($field => $search );
    $result = $database->select($table, array("id", "nombre"), $where);
    $response["items"] = $result;
    $app->render(200, $response);
});
// AUTH -------------------------------------------------
$app->post('/auth', function () use ($app) {
	$params = json_decode(file_get_contents('php://input'));
	$auth = new UserAuthenticator();
	$user = $auth->authenticate($params->username, $params->password);
	if($user) {
		$response["success"] = true;
		$response["id"] = $user["id"];
	} else {
		$response["success"] = false;
	}
    $app->render(200, $response);
});
// ADMIN POST -------------------------------------------------
$app->get('/admin/datatable/:table', function ($table) use ($app) {
	$database = new medoo();
	$params = $app->request->post();
	$join = array("[>]categorias" => array("categoria" => "id"), "[>]autores" => array("autor" => "id") );
	$columnas = array('posts.id', 'posts.titulo', 'posts.body', 'posts.autor', 'posts.fecha', 'posts.categoria', 'posts.imagen', 'categorias.nombre(categoria_nombre)', 'autores.nombre(autor_nombre)' );
	$response["items"] = $database->select($table, $join, $columnas);
    $app->render(200, $response);
});
$app->post('/admin/datatable/:table', function ($table) use ($app) {
	$database = new medoo();
	$params = (array) json_decode(file_get_contents('php://input'));
	$data = array(
		'titulo' => $params["titulo"],
		'body' => $params["body"],
		'autor' => (int) $params["autor"],
		'fecha' => $params["fecha"],
		'categoria' => (int) $params["categoria"],
		'imagen' => $params["imagen"]
	);
	if(is_null($params["id"])) {
		$data["id"] = null;
		$response["success"] = $database->insert($table, $data);
	} else {
		$data["id"] = (int) $params["id"];
		$where = array("id" => $params["id"]);
		$response["success"] = $database->update($table, $data, $where);
		$response["errors"] = $database->error();
	}
    $app->render(200, $response);
});
$app->delete('/admin/datatable/:table/:id', function ($table, $id) use ($app) {
	$database = new medoo();
	$where["AND"] = array("id" => $id );
	$response["success"] = $database->delete($table, $where);
    $app->render(200, $response);
});
// ADMIN META -------------------------------------------------
$app->get('/admin/datatable/meta/:table', function ($table) use ($app) {
	$database = new medoo();
	$params = $app->request->get();
	$response["items"] = $database->select($table, "*");
    $app->render(200, $response);
});
$app->post('/admin/datatable/meta/:table', function ($table) use ($app) {
	$database = new medoo();
	$params = (array) json_decode(file_get_contents('php://input'));
	if(isset($params["password"])) {
		$params["password"] = md5($params["password"]);
	}
	if(is_null($params["id"])) {
		$params["id"] = null;
		$response["success"] = $database->insert($table, $params);
	} else {
		$params["id"] = (int) $params["id"];
		$where = array("id" => $params["id"]);
		$response["success"] = $database->update($table, $params, $where);
		$response["errors"] = $database->error();
	}
    $app->render(200, $response);
});
$app->delete('/admin/datatable/meta/:table/:id', function ($table, $id) use ($app) {
	$database = new medoo();
	$where["AND"] = array("id" => $id );
	$response["success"] = $database->delete($table, $where);
    $app->render(200, $response);
});
$app->run();