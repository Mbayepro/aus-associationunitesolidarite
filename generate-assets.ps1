Add-Type -AssemblyName System.Drawing

$publicDir = "C:\Demo\AUS\public"
$imagesDir = Join-Path $publicDir "images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
}

function New-Logo {
    param([string]$outputPath)
    $w = 600
    $h = 600
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $g.Clear([System.Drawing.Color]::White)

    $cBlue = [System.Drawing.Color]::FromArgb(18, 75, 156)      # Bleu #124B9C
    $cRed = [System.Drawing.Color]::FromArgb(220, 38, 38)       # Rouge #DC2626
    $cOrange = [System.Drawing.Color]::FromArgb(234, 88, 12)    # Orange #EA580C
    $cGreen = [System.Drawing.Color]::FromArgb(22, 163, 74)     # Vert #16A34A

    $penBlue = New-Object System.Drawing.Pen($cBlue, 14)
    $penRed = New-Object System.Drawing.Pen($cRed, 14)
    $penOrange = New-Object System.Drawing.Pen($cOrange, 14)
    $penGreen = New-Object System.Drawing.Pen($cGreen, 14)

    $rectOuter = New-Object System.Drawing.Rectangle(45, 45, 510, 510)
    $g.DrawArc($penBlue, $rectOuter, 180, 90)
    $g.DrawArc($penRed, $rectOuter, 270, 90)
    $g.DrawArc($penOrange, $rectOuter, 0, 90)
    $g.DrawArc($penGreen, $rectOuter, 90, 90)

    $penInner = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(235, 240, 248), 6)
    $g.DrawEllipse($penInner, 80, 80, 440, 440)

    $brushGreen = New-Object System.Drawing.SolidBrush($cGreen)
    $brushRed = New-Object System.Drawing.SolidBrush($cRed)
    $brushOrange = New-Object System.Drawing.SolidBrush($cOrange)
    $brushBlue = New-Object System.Drawing.SolidBrush($cBlue)

    $g.FillEllipse($brushRed, 275, 120, 50, 50)
    $g.FillEllipse($brushOrange, 195, 160, 42, 42)
    $g.FillEllipse($brushGreen, 365, 160, 42, 42)

    $penHands = New-Object System.Drawing.Pen($cBlue, 10)
    $g.DrawArc($penHands, 190, 170, 220, 110, 0, 180)

    $fontAus = New-Object System.Drawing.Font("Arial", 64, [System.Drawing.FontStyle]::Bold)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString("A U S", $fontAus, $brushBlue, 300, 280, $sf)

    $penLine1 = New-Object System.Drawing.Pen($cRed, 4)
    $penLine2 = New-Object System.Drawing.Pen($cOrange, 4)
    $penLine3 = New-Object System.Drawing.Pen($cGreen, 4)
    $g.DrawLine($penLine1, 150, 335, 230, 335)
    $g.DrawLine($penLine2, 230, 335, 370, 335)
    $g.DrawLine($penLine3, 370, 335, 450, 335)

    $fontSubtitle = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold)
    $brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 41, 59))
    $g.DrawString("ASSOCIATION POUR L'UNITE", $fontSubtitle, $brushDark, 300, 365, $sf)
    $g.DrawString("ET LA SOLIDARITE", $fontSubtitle, $brushDark, 300, 390, $sf)

    $fontSlogan = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Italic)
    $brushSlogan = New-Object System.Drawing.SolidBrush($cOrange)
    $g.DrawString("Unis pour un impact durable", $fontSlogan, $brushSlogan, 300, 425, $sf)

    $fontLoc = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
    $brushLoc = New-Object System.Drawing.SolidBrush($cGreen)
    $g.DrawString("YEUMBEUL NORD - KEUR MASSAR", $fontLoc, $brushLoc, 300, 460, $sf)

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Logo généré : $outputPath"
}

function New-PlaceholderImage {
    param(
        [string]$outputPath,
        [int]$w,
        [int]$h,
        [string]$badge,
        [string]$title,
        [string]$category,
        [string]$themeColor
    )
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $baseColor = switch ($themeColor) {
        "blue"   { [System.Drawing.Color]::FromArgb(18, 75, 156) }
        "red"    { [System.Drawing.Color]::FromArgb(220, 38, 38) }
        "orange" { [System.Drawing.Color]::FromArgb(234, 88, 12) }
        "green"  { [System.Drawing.Color]::FromArgb(22, 163, 74) }
        default  { [System.Drawing.Color]::FromArgb(15, 23, 42) }
    }
    $darkColor = [System.Drawing.Color]::FromArgb(10, 20, 45)

    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $brushGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $baseColor, $darkColor, 45)
    $g.FillRectangle($brushGrad, $rect)

    $brushHalo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 255, 255, 255))
    $g.FillEllipse($brushHalo, [int]($w * 0.6), -100, [int]($w * 0.6), [int]($w * 0.6))
    $g.FillEllipse($brushHalo, -80, [int]($h * 0.5), [int]($w * 0.5), [int]($w * 0.5))

    $badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 255, 255))
    $badgeTextBrush = New-Object System.Drawing.SolidBrush($baseColor)
    $badgeFont = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Bold)
    $g.FillRectangle($badgeBrush, 40, 40, 150, 34)
    
    $sfLeft = New-Object System.Drawing.StringFormat
    $sfLeft.Alignment = [System.Drawing.StringAlignment]::Center
    $sfLeft.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($category.ToUpper(), $badgeFont, $badgeTextBrush, 115, 57, $sfLeft)

    $tagFont = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Bold)
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $sfRight = New-Object System.Drawing.StringFormat
    $sfRight.Alignment = [System.Drawing.StringAlignment]::Far
    $sfRight.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString("AUS - Yeumbeul Nord", $tagFont, $whiteBrush, ($w - 40), 57, $sfRight)

    $sfCenter = New-Object System.Drawing.StringFormat
    $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
    $sfCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

    $titleFont = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
    $rectText = New-Object System.Drawing.RectangleF(40, [int]($h * 0.35), ($w - 80), [int]($h * 0.38))
    $g.DrawString($title, $titleFont, $whiteBrush, $rectText, $sfCenter)

    $subFont = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Regular)
    $lightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 240, 255))
    $g.DrawString($badge, $subFont, $lightBrush, [int]($w / 2), ($h - 50), $sfCenter)

    $penBar = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(249, 115, 22), 8)
    $g.DrawLine($penBar, 0, ($h - 4), $w, ($h - 4))

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
}

# Invocations utilisant les verbes approuvés
New-Logo (Join-Path $publicDir "logo.png")

New-PlaceholderImage (Join-Path $imagesDir "action-medicale.jpg") 800 520 "Samedi 10 Octobre 2026 - Ecole Aliou Kebe" "Journee de Consultation Medicale Gratuite & Don de Medicaments" "Sante" "blue"
New-PlaceholderImage (Join-Path $imagesDir "action-sourire.jpg") 800 520 "Fonds Yaakaar - Impact Hub Dakar" "Sante Solidaire : Un Sourire Sain, Un Avenir Serein" "Sante" "green"
New-PlaceholderImage (Join-Path $imagesDir "action-panel.jpg") 800 520 "Dialogue Structure - Engage Senegal" "Grand Panel Citoyen & Jeunesse de Yeumbeul Nord" "Citoyennete" "orange"

New-PlaceholderImage (Join-Path $imagesDir "news-1.jpg") 800 480 "Preparatifs Ecole Aliou Kebe & UCAD" "Consultation Medicale Gratuite 2026" "Actualites" "blue"
New-PlaceholderImage (Join-Path $imagesDir "news-2.jpg") 800 480 "Hygiene Bucco-Dentaire Enfants" "Partenariat Fonds Yaakaar & AUS" "Partenariat" "green"
New-PlaceholderImage (Join-Path $imagesDir "news-3.jpg") 800 480 "Restitution des Recommandations" "Panel Citoyen Engage Senegal" "Jeunesse" "orange"

New-PlaceholderImage (Join-Path $imagesDir "galerie-1.jpg") 700 500 "Soins Dentaires Gratuits" "Consultations Odontologie UCAD" "Sante" "blue"
New-PlaceholderImage (Join-Path $imagesDir "galerie-2.jpg") 700 500 "Eleves de Yeumbeul Nord" "Distribution de Kits de Brossage" "Sante" "green"
New-PlaceholderImage (Join-Path $imagesDir "galerie-3.jpg") 700 500 "Salle Polyvalente" "Grand Panel Citoyen des Jeunes" "Citoyennete" "orange"
New-PlaceholderImage (Join-Path $imagesDir "galerie-4.jpg") 700 500 "Dotation aux Familles" "Pharmacie Solidaire & Medicaments" "Solidarite" "red"
New-PlaceholderImage (Join-Path $imagesDir "galerie-5.jpg") 700 500 "Terrain Bokk Xalaat" "Mobilisation Benevole de Quartier" "Communaute" "blue"
New-PlaceholderImage (Join-Path $imagesDir "galerie-6.jpg") 700 500 "Daaras de Diamalaye" "Sensibilisation Hygiene des Enfants" "Jeunesse" "green"

New-PlaceholderImage (Join-Path $imagesDir "team-1.jpg") 400 400 "Coordination Generale" "President de l AUS" "Equipe" "blue"
New-PlaceholderImage (Join-Path $imagesDir "team-2.jpg") 400 400 "Commission Medicale" "Responsable Pole Sante" "Equipe" "green"
New-PlaceholderImage (Join-Path $imagesDir "team-3.jpg") 400 400 "Administration & Partenariats" "Secretaire Generale" "Equipe" "orange"
New-PlaceholderImage (Join-Path $imagesDir "team-4.jpg") 400 400 "Mobilisation Terrain" "Responsable Jeunesse" "Equipe" "red"

New-PlaceholderImage (Join-Path $imagesDir "hero-bg.jpg") 1200 650 "Yeumbeul Nord & Keur Massar" "Unis pour un impact durable - AUS en action" "Solidarite" "blue"
New-PlaceholderImage (Join-Path $publicDir "og-image.jpg") 1200 630 "Yeumbeul Nord & Keur Massar, Senegal" "AUS - Association pour l Unite et la Solidarite" "Site Officiel" "blue"

Write-Output "SUCCES_ASSETS"

