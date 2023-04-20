<%@ page pageEncoding="UTF-8"%> 
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="t"%>
<%@ taglib tagdir="/WEB-INF/tags/frag" prefix="f"%>
<t:template>
	<jsp:attribute name="title">${category.title}</jsp:attribute>
	<jsp:attribute name="content">
		<article class="category"><h1>${category.title}</h1></article>
		<c:forEach items="${posts}" var="post">
			<f:articleshort post="${post}"/>
		</c:forEach>
	</jsp:attribute>
</t:template>