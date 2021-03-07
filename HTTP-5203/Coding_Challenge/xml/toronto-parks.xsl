<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Coding Challenge</title>
            </head>
            <body>
                <xsl:for-each select="//Location[LocationID=9]">
                    <h1>
                        <xsl:value-of select="LocationName" />
                    </h1>
                    <p>
                        Location:
                        <xsl:value-of select="Address" />
                    </p>
                    <p>
                        <xsl:value-of select="PhoneNumber" />
                    </p>
                    <h2>Facilities</h2>
                    <ul>
                        <xsl:for-each select="Facilities/Facility">
                            <xsl:apply-templates select="." />
                        </xsl:for-each>
                    </ul>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="Facility">
        <xsl:choose>
            <xsl:when test="FacilityName">
                <li>
                    <xsl:value-of select="FacilityDisplayName" />
                    -
                    <xsl:value-of select="FacilityName" />
                </li>
            </xsl:when>
            <xsl:otherwise>
                <li>
                    <xsl:value-of select="FacilityDisplayName" />
                </li>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>