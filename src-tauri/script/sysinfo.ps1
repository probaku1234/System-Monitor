function get_level_info {
    param (
        [string]$barprefix,
        [string]$style,
        [int]$percentage,
        [string]$text,
        [switch]$altstyle
    )

    switch ($style) {
        'bar' { return "$barprefix$(get_percent_bar $percentage)" }
        'textbar' { return "$text $(get_percent_bar $percentage)" }
        'bartext' { return "$barprefix$(get_percent_bar $percentage) $text" }
        default { if ($altstyle) { return "$percentage% ($text)" } else { return "$text $percentage" }}
    }
}

function info_disk {
    [System.Collections.ArrayList]$lines = @()

    function to_units($value) {
        if ($value -gt 1tb) {
            return "$([math]::round($value / 1tb, 1)) TiB"
        } else {
            return "$([math]::floor($value / 1gb)) GiB"
        }
    }

    [System.IO.DriveInfo]::GetDrives().ForEach{
        $diskLetter = $_.Name.SubString(0,2)
		$driveFormat = $_.DriveFormat
        
		<# try { #>
			if ($_.TotalSize -gt 0) {
				$used = $_.TotalSize - $_.AvailableFreeSpace
				$usage = [math]::Floor(($used / $_.TotalSize * 100))

				[void]$lines.Add(@{
					title   = "Disk ($diskLetter)"
					content = get_level_info "" $diskstyle $usage "$(to_units $used) / $(to_units $_.TotalSize) $driveFormat"
				})
			}
		<# } catch {
			[void]$lines.Add(@{
				title   = "Disk ($diskLetter)"
				content = "(failed to get disk usage)"
			})
		} #>
        
    }

    return $lines
}

info_disk