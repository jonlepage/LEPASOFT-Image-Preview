using System;
using System.Collections;
using System.Collections.Generic;
public class Test
{
    void Start()
    {
        // Hover over MAIN_ROOT_NEW_SCENE_DIALOG_001 -> should show GREEN circle with checkmark
        var dialog = DialogueKeys.MAIN_ROOT_NEW_SCENE_DIALOG_001;
        Console.WriteLine(dialog);

        // Hover over TEST_RED_CIRCLE -> should show RED circle with X
        var red = DialogueKeys.TEST_RED_CIRCLE;

       
    }
}
