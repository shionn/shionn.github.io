<%@ tag pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags/frag" %>
<%@ attribute name="content" fragment="true"%>
<%@ attribute name="scripts" fragment="true"%>
<%@ attribute name="title" type="java.lang.String" %>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<link rel="stylesheet" href="<spring:url value="/css/generated/style.css"/>" />
<link rel="alternate" type="application/rss+xml" title="Shionn::blog() - Be a geeK - Flux" href="<spring:url value="/feed"/>">
<title>${title}</title>
</head>
<body>
	<header class="container">
		<div class="banner">
			<h1>
				<a href="<spring:url value="/"/>">Shionn::Blog()</a>
			</h1>
			<h2>Pourquoi ? Pourquoi pas ?</h2>
		</div>
		<nav class="main-menu" role="navigation">
			<a href="#">Shionn::Blog()<span class="fa fa-2 fa-bars"></span></a>
			<t:menu menu="${menu}"/>
		</nav>
	</header>
	<div class="container">
		<div class="main">
			<jsp:invoke fragment="content" />
		</div>
		<div class="side">
			<div class="lastcomment">
				<h1><span class="fa fa-comments"></span> Commentaires récents</h1>
				<ul>
					<c:forEach items="${lastcomments}" var="comment">
						<li>${comment.authorName} dans <a href="<spring:url value="/${comment.post.url}#comments"/>">${comment.post.title}</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="tagclood">
				<h1><span class="fa fa-flag"></span> Tags</h1>
				<c:forEach items="${cloodtags}" var="tag">
					<a href="<spring:url value="/tag/${tag.url}"/>">${tag.title}(${tag.postCount})</a>
				</c:forEach>
			</div>
		</div>
	</div>
	<footer class="footer">
		<div class="container">
			<span>Blog propulsé par un moteur maison en java.</span>
			<span>
				<a href="mailto:shionn@gmail.com" title="Contact"><i class="fa fa-envelope" aria-hidden="true"></i></a> |
				<a href="https://github.com/shionn/Blog" target="_blank" title="Github"><i class="fa fa-github"></i></a> |
				<a href="http://fontawesome.io/" target="_blank" title="FontAwesome"><i class="fa fa-font-awesome"></i></a> |
				<a href="https://spring.io/" target="_blank" title="Spring"><i class="fa fa-leaf"></i></a> |
				<a href="http://blog.mybatis.org/" target="_blank" title="MyBatis"><i class="fa fa-twitter"></i></a> |
				<a href="https://purecss.io/" target="_blank" title="PureIoCss">P<sub>css</sub></a> |
				<a href="http://lesscss.org/" target="_blank" title="Less">{<small>less</small>}</a> |
				<a href="http://commonmark.org/" target="_blank" title="CommonMark">M<i class="fa fa-long-arrow-down"></i></a>
			</span>
		</div>
	</footer>
	<div class="gallery-preview" tabindex="-1" role="dialog">
		<img class="content">
	</div>
	<script type="text/javascript" src="<spring:url value="/js/lib/jquery-3.1.0.min.js" />"></script>
	<script type="text/javascript" src="<spring:url value="/js/lib/highlight-9.8.0-java.min.js"/>"></script>
	<script type="text/javascript" src="<spring:url value="/js/menu.js" />"></script>
	<script type="text/javascript" src="<spring:url value="/js/modal.js" />"></script>
	<script type="text/javascript" src="<spring:url value="/js/gallery.js" />"></script>
	<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
	<jsp:invoke fragment="scripts" />
</body>
</html>
