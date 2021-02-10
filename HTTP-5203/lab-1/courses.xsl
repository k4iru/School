<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
    <html>
        <head>
            <title>Courses</title>
        </head>
        <body>
            <h1>Courses</h1>
            <table>
                <thead>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </thead>
                <tbody>
 
                    <tr>
                        <td>
						<xsl:for-each select="//course[dayofweek=1]">
							<xsl:sort select="timestart" datatype="number" />
							<xsl:apply-templates select="." />
						</xsl:for-each>				
						</td>
						<td>
						<xsl:for-each select="//course[dayofweek=2]">
							<xsl:sort select="timestart" datatype="number" />
							<xsl:apply-templates select="." />
						</xsl:for-each>				
						</td>
						<td>
						<xsl:for-each select="//course[dayofweek=3]">
							<xsl:sort select="timestart" datatype="number" />
							<xsl:apply-templates select="." />
						</xsl:for-each>				
						</td>
						<td>
						<xsl:for-each select="//course[dayofweek=4]">
							<xsl:sort select="timestart" datatype="number" />
							<xsl:apply-templates select="." />
						</xsl:for-each>				
						</td>
						<td>
						<xsl:for-each select="//course[dayofweek=5]">
							<xsl:sort select="timestart" datatype="number" />
							<xsl:apply-templates select="." />
						</xsl:for-each>				
						</td>
                    </tr>
   
                </tbody>
            </table>
        </body>
    </html>
    </xsl:template>
	<xsl:template match="course">
	<div>
		<h3><xsl:value-of select="code" /> - <xsl:value-of select="name" /></h3>
		<p>Start-time: <xsl:value-of select="timestart" /></p>
		<p>End-time: <xsl:value-of select="timeend" /></p>
		<p>Instructor: 
			<xsl:value-of select="instructor/first" />
			<xsl:text> </xsl:text>
			<xsl:value-of select="instructor/last" />
		</p>
	</div>
	</xsl:template>
</xsl:stylesheet>