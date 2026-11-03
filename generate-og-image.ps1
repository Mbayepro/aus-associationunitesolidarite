Add-Type -AssemblyName System.Drawing

$outputPath = "C:\Demo\AUS\public\og-image.jpg"
$w = 1200
$h = 630

$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# 1. Fond dégradé bleu nuit profond et chaleureux
$rectFull = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$cDarkNavy = [System.Drawing.Color]::FromArgb(10, 25, 52)      # #0A1934
$cAusBlue  = [System.Drawing.Color]::FromArgb(18, 75, 156)     # #124B9C
$gradBg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rectFull,
    $cDarkNavy,
    $cAusBlue,
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
)
$g.FillRectangle($gradBg, $rectFull)

# 2. Cercles lumineux décoratifs (Glow) aux couleurs de l'AUS
$brushGlowRed = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 220, 38, 38))
$g.FillEllipse($brushGlowRed, -100, -100, 450, 450)

$brushGlowOrange = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 234, 88, 12))
$g.FillEllipse($brushGlowOrange, 950, -80, 400, 400)

$brushGlowGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 22, 163, 74))
$g.FillEllipse($brushGlowGreen, 850, 350, 450, 450)

# 3. Ruban supérieur quadricolore (Bleu, Rouge, Orange, Vert)
$cRed    = [System.Drawing.Color]::FromArgb(220, 38, 38)
$cOrange = [System.Drawing.Color]::FromArgb(234, 88, 12)
$cGreen  = [System.Drawing.Color]::FromArgb(22, 163, 74)

$brushBlue   = New-Object System.Drawing.SolidBrush($cAusBlue)
$brushRed    = New-Object System.Drawing.SolidBrush($cRed)
$brushOrange = New-Object System.Drawing.SolidBrush($cOrange)
$brushGreen  = New-Object System.Drawing.SolidBrush($cGreen)

$g.FillRectangle($brushBlue,   0,   0, 300, 10)
$g.FillRectangle($brushRed,    300, 0, 300, 10)
$g.FillRectangle($brushOrange, 600, 0, 300, 10)
$g.FillRectangle($brushGreen,  900, 0, 300, 10)

# 4. Charger et dessiner le Logo officiel AUS dans un cercle blanc élégant
$logoPath = "C:\Demo\AUS\public\logo.png"
if (Test-Path $logoPath) {
    $logoImg = [System.Drawing.Image]::FromFile($logoPath)
    
    # Cercle d'arrière-plan blanc pour faire ressortir le logo
    $brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.FillEllipse($brushWhite, 80, 150, 310, 310)

    # Bordure subtile autour du badge logo
    $penLogoBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 230, 245), 6)
    $g.DrawEllipse($penLogoBorder, 80, 150, 310, 310)

    # Anneau décoratif orange / vert fin
    $penRing = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(234, 88, 12), 3)
    $g.DrawArc($penRing, 74, 144, 322, 322, -45, 120)

    $penRingGreen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(22, 163, 74), 3)
    $g.DrawArc($penRingGreen, 74, 144, 322, 322, 135, 120)

    # Dessin du logo centré à l'intérieur
    $g.DrawImage($logoImg, 100, 170, 270, 270)
    $logoImg.Dispose()
}

# 5. Bloc de textes à droite (X: 430 -> 1130)

# Badge supérieur localisation & drapeau
$rectBadge = New-Object System.Drawing.Rectangle(430, 95, 490, 40)
$brushBadgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 255, 255, 255))
$penBadgeBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 255, 255, 255), 1.5)

# Coins arrondis manuels ou rectangle net
$g.FillRectangle($brushBadgeBg, $rectBadge)
$g.DrawRectangle($penBadgeBorder, $rectBadge)

$fontBadge = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Bold)
$brushBadgeText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(254, 215, 170)) # pêche chaud
$sfLeft = New-Object System.Drawing.StringFormat
$sfLeft.Alignment = [System.Drawing.StringAlignment]::Near
$sfLeft.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("YEUMBEUL NORD  •  KEUR MASSAR  •  DAKAR", $fontBadge, $brushBadgeText, 450, 115, $sfLeft)

# Grand Titre Acronyme + Nom Complet
$fontAcronym = New-Object System.Drawing.Font("Arial", 46, [System.Drawing.FontStyle]::Bold)
$brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.DrawString("AUS", $fontAcronym, $brushWhite, 430, 150)

$fontFullName = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
$brushFullName = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(226, 232, 240))
$g.DrawString("Association pour l'Unite et la Solidarite", $fontFullName, $brushFullName, 430, 215)

# Ligne de séparation colorée
$g.FillRectangle($brushOrange, 430, 260, 140, 5)
$g.FillRectangle($brushGreen, 575, 260, 80, 5)

# Slogan officiel
$fontSlogan = New-Object System.Drawing.Font("Arial", 19, [System.Drawing.FontStyle]::Italic)
$brushSlogan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(254, 240, 138)) # Jaune doux
$g.DrawString("« Unis pour un impact durable »  •  #AUSenAction", $fontSlogan, $brushSlogan, 430, 280)

# Piliers & Actions clés (3 Badges horizontaux)
$fontPill = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
$sfPill = New-Object System.Drawing.StringFormat
$sfPill.Alignment = [System.Drawing.StringAlignment]::Center
$sfPill.LineAlignment = [System.Drawing.StringAlignment]::Center

# Pill 1: Sante & Consultations
$brushPill1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(50, 16, 185, 129))
$penPill1 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 52, 211, 153), 1.5)
$g.FillRectangle($brushPill1, 430, 335, 230, 42)
$g.DrawRectangle($penPill1, 430, 335, 230, 42)
$brushPillText1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(209, 250, 229))
$g.DrawString("SANTE & DENTAIRE", $fontPill, $brushPillText1, 545, 356, $sfPill)

# Pill 2: Jeunesse & Education
$brushPill2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(50, 249, 115, 22))
$penPill2 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 251, 146, 60), 1.5)
$g.FillRectangle($brushPill2, 675, 335, 215, 42)
$g.DrawRectangle($penPill2, 675, 335, 215, 42)
$brushPillText2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(254, 215, 170))
$g.DrawString("JEUNESSE & CITOYENNETE", $fontPill, $brushPillText2, 782, 356, $sfPill)

# Pill 3: Solidarite
$brushPill3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(50, 59, 130, 246))
$penPill3 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 96, 165, 250), 1.5)
$g.FillRectangle($brushPill3, 905, 335, 215, 42)
$g.DrawRectangle($penPill3, 905, 335, 215, 42)
$brushPillText3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(219, 234, 254))
$g.DrawString("SOLIDARITE DE TERRAIN", $fontPill, $brushPillText3, 1012, 356, $sfPill)

# Description courte
$fontDesc = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Regular)
$brushDesc = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(203, 213, 225))
$rectDesc = New-Object System.Drawing.RectangleF(430, 395, 690, 60)
$g.DrawString("Consultations medicales gratuites multidisciplinaires, dons de medicaments, sensibilisation bucco-dentaire et panels citoyens a Yeumbeul Nord.", $fontDesc, $brushDesc, $rectDesc)

# 6. Bandeau inférieur de contact & URL
$rectBottom = New-Object System.Drawing.Rectangle(0, 520, $w, 110)
$brushBottom = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 6, 16, 36))
$g.FillRectangle($brushBottom, $rectBottom)

$penBottomLine = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(50, 255, 255, 255), 1)
$g.DrawLine($penBottomLine, 0, 520, $w, 520)

# Contacts dans le bandeau inférieur
$fontFootBold = New-Object System.Drawing.Font("Arial", 15, [System.Drawing.FontStyle]::Bold)
$fontFootSub  = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Regular)
$brushFootSub = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(148, 163, 184))

# Colonne 1 : Permanence WhatsApp / Tel
$g.DrawString("WhatsApp & Tel : 77 157 67 55", $fontFootBold, $brushWhite, 80, 545)
$g.DrawString("Permanence Diamalaye / Bokk Xalaat", $fontFootSub, $brushFootSub, 80, 575)

# Colonne 2 : Partenaires d'impact
$g.DrawString("Partenaires de terrain", $fontFootBold, $brushWhite, 480, 545)
$g.DrawString("Odontologie UCAD • Poste Diamalaye • Impact Hub • Engage", $fontFootSub, $brushFootSub, 480, 575)

# Colonne 3 : Badge Site Web Officiel
$rectWebPill = New-Object System.Drawing.Rectangle(930, 542, 200, 48)
$brushWebPill = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(234, 88, 12))
$g.FillRectangle($brushWebPill, $rectWebPill)
$fontWeb = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Bold)
$g.DrawString("SITE OFFICIEL", $fontWeb, $brushWhite, 1030, 566, $sfPill)

# Sauvegarde en haute qualité JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$bmp.Save($outputPath, $codec, $encoderParams)

$g.Dispose()
$bmp.Dispose()

Write-Output "OG_IMAGE_GENERATED_SUCCESSFULLY: $outputPath"

