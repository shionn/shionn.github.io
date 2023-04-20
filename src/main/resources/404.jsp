<%@ page pageEncoding="UTF-8"%> 
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="t"%>
<t:template>
	<jsp:attribute name="title">Shionn::blog() - Be a geeK - 404</jsp:attribute>
	<jsp:attribute name="content">
		<div class="e404">
			<p><em>Mince alors !</em> Cette page n'existe pas (ou plus).</p>
			<p>essayer de revenir à la page d'<a href="<spring:url value="/"/>">Accueil</a></p>
			<h1>404</h1>
		</div>
	</jsp:attribute>
</t:template>
